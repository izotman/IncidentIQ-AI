import { useState } from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import Dashboard from "../pages/Dashboard";
import Devices from "../pages/Devices";
import Incidents from "../pages/Incidents";
import AIAssistant from "../pages/AIAssistant";
import Reports from "../pages/Reports";

export type Page =
  | "Dashboard"
  | "Incidents"
  | "Medical Devices"
  | "AI Assistant"
  | "AI Insights"
  | "Reports"
  | "Knowledge Base"
  | "Integrations"
  | "Settings";

function UtilityPage({ page }: { page: "Knowledge Base" | "Integrations" | "Settings" }) {
  const descriptions = {
    "Knowledge Base": "Clinical IT procedures, troubleshooting guides, and support documentation.",
    Integrations: "HL7, DICOM, FHIR, PACS, Epic, network, and infrastructure integration status.",
    Settings: "IncidentIQ AI application, alerting, security, and facility configuration."
  };

  return (
    <section className="panel utility-page">
      <div className="page-heading">
        <div>
          <div className="eyebrow">HEALTHCARE IT OPERATIONS</div>
          <h1>{page}</h1>
          <p>{descriptions[page]}</p>
        </div>
      </div>
      <div className="utility-grid">
        <div className="utility-card"><strong>Status</strong><span>Operational</span></div>
        <div className="utility-card"><strong>Facility</strong><span>Planned Parenthood Northern California</span></div>
        <div className="utility-card"><strong>Access</strong><span>Connected</span></div>
      </div>
    </section>
  );
}

export default function MainLayout() {
  const [page, setPage] = useState<Page>("Dashboard");

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} />
      <div className="main-shell">
        <TopBar setPage={setPage} />
        <main className="main-content">
          {page === "Dashboard" && <Dashboard setPage={setPage} />}
          {page === "Incidents" && <Incidents />}
          {page === "Medical Devices" && <Devices />}
          {(page === "AI Assistant" || page === "AI Insights") && <AIAssistant />}
          {page === "Reports" && <Reports />}
          {(page === "Knowledge Base" || page === "Integrations" || page === "Settings") && (
            <UtilityPage page={page} />
          )}
        </main>
      </div>
    </div>
  );
}
