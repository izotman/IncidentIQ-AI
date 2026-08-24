import { Bell, HeartPulse } from "lucide-react";
import type { Page } from "../layouts/MainLayout";

type TopBarProps = {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
};

export default function TopBar({ setPage }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar-title">
        <HeartPulse size={19} />
        <div>
          <strong>Healthcare Operations Center</strong>
          <small>Simulation Environment</small>
        </div>
      </div>

      <div className="topbar-user">
        <button
          type="button"
          onClick={() => setPage("Incidents")}
          aria-label="View active incidents"
          title="View Active Incidents"
          style={{
            position: "relative",
            width: "38px",
            height: "38px",
            padding: 0,
            margin: 0,
            border: "1px solid #1769aa",
            borderRadius: "10px",
            background:
              "linear-gradient(145deg, #123d68 0%, #082542 55%, #061b31 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow:
              "inset 0 1px 2px rgba(255,255,255,0.15), 0 3px 8px rgba(0,0,0,0.35)",
          }}
        >
          <Bell
            size={21}
            strokeWidth={2.2}
            color="#fff1a6"
            fill="#f5c542"
            style={{
              filter:
                "drop-shadow(0 2px 1px rgba(0,0,0,0.65)) drop-shadow(0 0 4px rgba(245,197,66,0.35))",
            }}
          />

          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              minWidth: "17px",
              height: "17px",
              padding: "0 4px",
              borderRadius: "999px",
              background: "#ef4444",
              color: "#ffffff",
              border: "2px solid #071a2d",
              fontSize: "10px",
              fontWeight: 800,
              lineHeight: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 5px rgba(0,0,0,0.4)",
            }}
          >
            12
          </span>
        </button>

        <div className="user-avatar">MZ</div>

        <div className="user-info">
          <strong>Mark Zotman</strong>
          <small>Systems Engineer</small>
        </div>
      </div>
    </header>
  );
}