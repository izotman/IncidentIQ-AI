# IncidentIQ-AI GitHub Traffic Reporting Setup

## 1. Add the workflow files

Copy these files/directories into the root of the `izotman/IncidentIQ-AI` repository:

- `.github/workflows/incidentiq-traffic.yml`
- `scripts/github_traffic_report.py`
- `docs/traffic-report.md`
- `docs/data/traffic-history.json`

## 2. Create a GitHub token

Create a fine-grained personal access token scoped only to the `IncidentIQ-AI` repository.

Required repository permission:

- **Administration: Read-only**

Do not put the token in source code.

## 3. Add the repository secret

In the repository, open:

**Settings → Secrets and variables → Actions → New repository secret**

Name it:

`TRAFFIC_TOKEN`

Paste the token value as the secret.

## 4. Run the workflow

Open:

**Actions → IncidentIQ-AI Traffic Report → Run workflow**

The workflow will:

1. Query GitHub traffic data.
2. Store a daily snapshot.
3. Generate `docs/traffic-report.md`.
4. Commit the updated report back to the repository.

The scheduled job runs daily.

## 5. Optional GitHub Pages

If the repository already publishes the `docs` directory through GitHub Pages, `traffic-report.md` can be exposed as part of the project documentation. The raw JSON history is also available in the repository.

## Security

The token is stored as a GitHub Actions secret and is never written to the repository. The report stores aggregate traffic data, not visitor identities.
