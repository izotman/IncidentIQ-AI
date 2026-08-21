import { useState } from "react";
import { AlertCircle, ArrowRight, Clock3, X } from "lucide-react";

const incidents = [
  ["INC-2026-1001", "Ultrasound System Offline", "Ultrasound Room", "CRITICAL", "2 min ago"],
  ["INC-2026-1002", "PACS Image Retrieve Slow", "Nurse Station", "HIGH", "15 min ago"],
  ["INC-2026-1003", "Printer Not Responding", "Front Desk", "MEDIUM", "45 min ago"],
  ["INC-2026-1004", "Epic User Login Issue", "Nurse Station", "LOW", "1 hr ago"]
] as const;

export default function Incidents() {
  const [selected, setSelected] = useState<(typeof incidents)[number] | null>(null);

  return (
    <div>
      <div className="page-heading"><div><div className="eyebrow">INCIDENT MANAGEMENT</div><h1>Active Incidents</h1><p>Prioritized healthcare IT events requiring investigation or action.</p></div><div className="live-status"><span className="pulse" /> MONITORING</div></div>
      <section className="panel">
        <div className="panel-header"><div><h2>Incident Queue</h2><span>Click an incident to open its investigation view</span></div></div>
        <div className="incident-list">
          {incidents.map((incident) => (
            <button type="button" className="incident incident-button" key={incident[0]} onClick={() => setSelected(incident)}>
              <div className={`severity ${incident[3].toLowerCase()}`} />
              <AlertCircle size={18} />
              <div className="incident-info"><strong>{incident[1]}</strong><span>{incident[0]} • {incident[2]}</span></div>
              <div className="incident-right"><b className={incident[3].toLowerCase()}>{incident[3]}</b><small><Clock3 size={12} /> {incident[4]}</small></div>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" type="button" onClick={() => setSelected(null)}><X size={17} /></button>
            <div className="eyebrow">INCIDENT INVESTIGATION</div>
            <h2>{selected[1]}</h2>
            <div className="detail-status danger"><span className="room-status critical" /> {selected[3]} · {selected[0]}</div>
            <div className="detail-grid"><div><span>Location</span><strong>{selected[2]}</strong></div><div><span>Detected</span><strong>{selected[4]}</strong></div><div><span>Owner</span><strong>Healthcare IT Operations</strong></div><div><span>Status</span><strong>Open</strong></div></div>
            <div className="warning-box"><AlertCircle size={17} /><div><strong>Investigation workflow</strong><p>Collect logs → correlate device and network events → determine root cause → document remediation. This demo uses simulated clinical data.</p></div></div>
            <div className="modal-actions"><button className="outline-btn" onClick={() => setSelected(null)}>Close</button><button className="primary-btn" onClick={() => setSelected(null)}>Acknowledge Incident</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
