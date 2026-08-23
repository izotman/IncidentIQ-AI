#!/usr/bin/env python3
import json
import os
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

REPO = os.environ.get("REPO") or os.environ.get("GITHUB_REPOSITORY")
TOKEN = os.environ.get("TRAFFIC_TOKEN")
ROOT = Path(__file__).resolve().parents[1]
HISTORY_PATH = ROOT / "docs" / "data" / "traffic-history.json"
REPORT_PATH = ROOT / "docs" / "traffic-report.md"

if not REPO or not TOKEN:
    print("REPO and TRAFFIC_TOKEN are required.", file=sys.stderr)
    sys.exit(1)

BASE = f"https://api.github.com/repos/{REPO}/traffic"
HEADERS = {
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {TOKEN}",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "IncidentIQ-AI-Traffic-Reporter",
}


def get_json(url):
    req = Request(url, headers=HEADERS)
    try:
        with urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"GitHub API {exc.code}: {body}") from exc
    except URLError as exc:
        raise RuntimeError(f"GitHub API connection error: {exc}") from exc


def load_history():
    if not HISTORY_PATH.exists():
        return []
    try:
        return json.loads(HISTORY_PATH.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return []


def md_escape(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


def fmt_num(value):
    return f"{int(value):,}"


def period_totals(rows):
    return {
        "views": sum(r.get("views", 0) for r in rows),
        "unique_views": sum(r.get("unique_views", 0) for r in rows),
        "clones": sum(r.get("clones", 0) for r in rows),
        "unique_cloners": sum(r.get("unique_cloners", 0) for r in rows),
    }


def pct_change(current, previous):
    if previous == 0:
        return None
    return ((current - previous) / previous) * 100


def change_text(current, previous):
    change = pct_change(current, previous)
    if change is None:
        return "—"
    return f"{change:+.1f}%"


def main():
    views = get_json(f"{BASE}/views")
    clones = get_json(f"{BASE}/clones")
    referrers = get_json(f"{BASE}/popular/referrers")
    paths = get_json(f"{BASE}/popular/paths")

    now = datetime.now(timezone.utc)
    today = now.date().isoformat()
    v_items = views.get("views", [])
    c_items = clones.get("clones", [])

    snapshot = {
        "date": today,
        "captured_at_utc": now.isoformat(),
        "views": int(sum(x.get("count", 0) for x in v_items)),
        "unique_views": int(sum(x.get("uniques", 0) for x in v_items)),
        "clones": int(sum(x.get("count", 0) for x in c_items)),
        "unique_cloners": int(sum(x.get("uniques", 0) for x in c_items)),
        "daily_views": v_items,
        "daily_clones": c_items,
        "referrers": referrers,
        "popular_paths": paths,
    }

    history = load_history()
    history = [x for x in history if x.get("date") != today]
    history.append(snapshot)
    history = sorted(history, key=lambda x: x.get("date", ""))[-90:]
    HISTORY_PATH.parent.mkdir(parents=True, exist_ok=True)
    HISTORY_PATH.write_text(json.dumps(history, indent=2), encoding="utf-8")

    last7 = history[-7:]
    prev7 = history[-14:-7]
    t7 = period_totals(last7)
    tp = period_totals(prev7)

    report_lines = [
        "# IncidentIQ-AI Traffic Report",
        "",
        f"**Repository:** `{REPO}`  ",
        f"**Generated (UTC):** {now:%Y-%m-%d %H:%M:%S}  ",
        "**Source:** GitHub Repository Traffic API",
        "",
        "> GitHub's traffic API provides a rolling 14-day window. This workflow stores daily snapshots so the project maintains a longer historical record.",
        "",
        "## Current 7-Day Summary",
        "",
        "| Metric | Last 7 days | Prior 7 days | Change |",
        "|---|---:|---:|---:|",
        f"| Page views | {fmt_num(t7['views'])} | {fmt_num(tp['views'])} | {change_text(t7['views'], tp['views'])} |",
        f"| Unique visitors | {fmt_num(t7['unique_views'])} | {fmt_num(tp['unique_views'])} | {change_text(t7['unique_views'], tp['unique_views'])} |",
        f"| Clones | {fmt_num(t7['clones'])} | {fmt_num(tp['clones'])} | {change_text(t7['clones'], tp['clones'])} |",
        f"| Unique cloners | {fmt_num(t7['unique_cloners'])} | {fmt_num(tp['unique_cloners'])} | {change_text(t7['unique_cloners'], tp['unique_cloners'])} |",
        "",
        "## Daily Activity",
        "",
        "| Date | Views | Unique | Clones | Unique cloners |",
        "|---|---:|---:|---:|---:|",
    ]
    for row in last7:
        report_lines.append(
            f"| {row.get('date','')} | {fmt_num(row.get('views',0))} | {fmt_num(row.get('unique_views',0))} | {fmt_num(row.get('clones',0))} | {fmt_num(row.get('unique_cloners',0))} |"
        )

    report_lines += ["", "## Top Referrers", "", "| Referrer | Views | Unique |", "|---|---:|---:|"]
    for item in sorted(referrers, key=lambda x: x.get("count", 0), reverse=True)[:10]:
        report_lines.append(f"| {md_escape(item.get('referrer',''))} | {fmt_num(item.get('count',0))} | {fmt_num(item.get('uniques',0))} |")
    if not referrers:
        report_lines.append("| No referrer data returned | — | — |")

    report_lines += ["", "## Popular Repository Paths", "", "| Path | Views | Unique |", "|---|---:|---:|"]
    for item in sorted(paths, key=lambda x: x.get("count", 0), reverse=True)[:10]:
        report_lines.append(f"| `{md_escape(item.get('path',''))}` | {fmt_num(item.get('count',0))} | {fmt_num(item.get('uniques',0))} |")
    if not paths:
        report_lines.append("| No path data returned | — | — |")

    report_lines += [
        "",
        "## Notes",
        "",
        "- Repository traffic is not the same as detailed website/session analytics.",
        "- GitHub traffic is subject to GitHub's reporting windows and privacy rules.",
        "- Historical snapshots are retained in [`docs/data/traffic-history.json`](data/traffic-history.json).",
        "- This report is intended for portfolio monitoring and recruiter-interest signals, not identification of individual visitors.",
        "",
    ]

    REPORT_PATH.write_text("\n".join(report_lines), encoding="utf-8")
    print(f"Updated {REPORT_PATH}")
    print(f"Updated {HISTORY_PATH}")


if __name__ == "__main__":
    main()
