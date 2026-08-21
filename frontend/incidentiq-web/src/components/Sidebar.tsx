import type { Page } from "../layouts/MainLayout";
import {
  Activity,
  Brain,
  Database,
  FileWarning,
  HeartPulse,
  Network,
  Settings,
  ShieldCheck,
  Stethoscope
} from "lucide-react";

type Props = {
  page: Page;
  setPage: (page: Page) => void;
};

export default function Sidebar({ page, setPage }: Props) {
  const nav = [
    ["Dashboard", Activity],
    ["Medical Devices", Stethoscope],
    ["Incidents", FileWarning],
    ["AI Insights", Brain],
    ["Reports", Database],
    ["Knowledge Base", ShieldCheck],
    ["Integrations", Network],
    ["Settings", Settings]
  ] as const;

  return (
    <aside className="sidebar">
      <button className="sidebar-brand" type="button" onClick={() => setPage("Dashboard")}>
        <span className="brand-mark"><HeartPulse size={18} /></span>
        <span>
          <strong>IncidentIQ <em>AI</em></strong>
          <small>Healthcare IT Incident Management</small>
        </span>
      </button>

      <div className="facility-selector">
        <HeartPulse size={17} />
        <div>
          <strong>Planned Parenthood</strong>
          <span>Northern California</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">OPERATIONS</div>
        {nav.slice(0, 5).map(([label, Icon]) => (
          <button
            key={label}
            type="button"
            className={`nav-item ${page === label ? "active" : ""}`}
            onClick={() => setPage(label as Page)}
          >
            <Icon size={16} />
            <span>{label}</span>
            {label === "Incidents" && <b className="nav-badge">3</b>}
          </button>
        ))}

        <div className="sidebar-section-title system-heading">SYSTEMS</div>
        {nav.slice(5).map(([label, Icon]) => (
          <button
            key={label}
            type="button"
            className={`nav-item ${page === label ? "active" : ""}`}
            onClick={() => setPage(label as Page)}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="system-status">
        <div className="system-title">SYSTEM STATUS</div>
        {["HL7 Interface", "PACS Connection", "Epic EHR", "FHIR API"].map((name) => (
          <div key={name}>
            <span className="status-dot green" />
            <span>{name}</span>
            <b>Operational</b>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">© 2026 IncidentIQ AI</div>
    </aside>
  );
}
