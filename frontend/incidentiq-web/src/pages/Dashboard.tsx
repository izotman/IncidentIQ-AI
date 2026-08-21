import { useState } from "react";
import {
  AlertCircle, Activity, Brain, CheckCircle2, Clock3, Cpu, Database,
  FileWarning, Network, Server, ShieldCheck, Stethoscope, Wifi, XCircle, X,
  Play, Wrench
} from "lucide-react";

type Page =
  | "Dashboard" | "Incidents" | "Medical Devices" | "AI Assistant"
  | "AI Insights" | "Reports" | "Knowledge Base" | "Integrations" | "Settings";

const rooms = [
  ["Exam Room 1", 2, "Operational"], ["Exam Room 2", 3, "Operational"],
  ["Ultrasound Room", 1, "Critical"], ["Lab Room", 2, "Operational"],
  ["Waiting Area", 0, "Operational"], ["Nurse Station", 4, "Operational"],
  ["Consult Room", 1, "Operational"], ["Check-In Area", 2, "Operational"]
] as const;

const incidents = [
  ["INC-2026-1001", "Ultrasound System Offline", "Ultrasound Room", "CRITICAL", "2 min ago"],
  ["INC-2026-1002", "PACS Image Retrieve Slow", "Nurse Station", "HIGH", "15 min ago"],
  ["INC-2026-1003", "Printer Not Responding", "Front Desk", "MEDIUM", "45 min ago"]
] as const;

const devices = [
  ["GE Voluson E10", "Ultrasound Room", "Offline", true],
  ["Hologic Selenia Dimensions", "Mammography Room", "Operational", false],
  ["Mindray BeneVision N1", "Exam Room 2", "Operational", false],
  ["Siemens Lab Analyzer", "Lab Room", "Operational", false]
] as const;

type Device = (typeof devices)[number];

export default function Dashboard({ setPage }: { setPage?: (page: Page) => void }) {
  const [selectedRoom, setSelectedRoom] = useState<(typeof rooms)[number] | null>(null);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [troubleshootTarget, setTroubleshootTarget] = useState<{ type: "room" | "device"; name: string; location?: string; status?: string } | null>(null);
  const [diagnostics, setDiagnostics] = useState<Record<string, "pending" | "running" | "passed" | "failed">>({});

  const runTest = (key: string, result: "passed" | "failed" = "passed") => {
    setDiagnostics((current) => ({ ...current, [key]: "running" }));
    window.setTimeout(() => {
      setDiagnostics((current) => ({ ...current, [key]: result }));
    }, 450);
  };

  const openRoomTroubleshooting = (room: (typeof rooms)[number]) => {
    setSelectedRoom(null);
    setTroubleshootTarget({ type: "room", name: room[0], status: room[2] });
  };

  const openDeviceTroubleshooting = (device: Device) => {
    setSelectedDevice(null);
    setTroubleshootTarget({ type: "device", name: device[0], location: device[1], status: device[2] });
  };

  return (
    <div className="dashboard-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">HEALTHCARE IT OPERATIONS</div>
          <h1>Facility Overview</h1>
          <p>Planned Parenthood Northern California — San Francisco Health Center</p>
        </div>
        <div className="live-status"><span className="pulse" /> LIVE MONITORING</div>
      </div>

      <div className="summary-grid">
        <button className="summary-card blue summary-button" onClick={() => setPage?.("Medical Devices")}>
          <div className="summary-icon"><Cpu /></div><div><span>Total Devices</span><strong>142</strong><small>128 online · View fleet</small></div>
        </button>
        <button className="summary-card red summary-button" onClick={() => setPage?.("Incidents")}>
          <div className="summary-icon"><FileWarning /></div><div><span>Active Incidents</span><strong>3</strong><small>1 critical · View queue</small></div>
        </button>
        <button className="summary-card purple summary-button" onClick={() => setPage?.("AI Insights")}>
          <div className="summary-icon"><Brain /></div><div><span>AI Insights</span><strong>24</strong><small>5 prevented incidents</small></div>
        </button>
        <div className="summary-card green">
          <div className="summary-icon"><Activity /></div><div><span>System Health</span><strong>96%</strong><small>All core systems operational</small></div>
        </div>
      </div>

      <div className="content-grid">
        <section className="panel facility-panel">
          <div className="panel-header">
            <div><h2>Facility Floorplan</h2><span>Click a room, then troubleshoot it</span></div>
            <div className="legend"><span><i className="legend-green" />Operational</span><span><i className="legend-red" />Critical</span></div>
          </div>
          <div className="floorplan">
            {rooms.map((room) => (
              <button key={room[0]} type="button" className={`room room-button ${room[2] === "Critical" ? "critical" : ""}`} onClick={() => setSelectedRoom(room)}>
                <div className="room-header"><strong>{room[0]}</strong><span className={`room-status ${room[2] === "Critical" ? "critical" : ""}`} /></div>
                <span>{room[1]} {room[1] === 1 ? "Device" : "Devices"}</span>
                {room[2] === "Critical" && <div className="critical-label"><AlertCircle size={13} /> DEVICE OFFLINE</div>}
                <em>Open room →</em>
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header">
            <div><h2>Active Incidents</h2><span>Requires attention</span></div>
            <button type="button" onClick={() => setPage?.("Incidents")}>View All</button>
          </div>
          <div className="incident-list">
            {incidents.map((incident) => (
              <button key={incident[0]} type="button" className="incident incident-button" onClick={() => setPage?.("Incidents")}>
                <div className={`severity ${incident[3].toLowerCase()}`} />
                <div className="incident-info"><strong>{incident[1]}</strong><span>{incident[0]} • {incident[2]}</span></div>
                <div className="incident-right"><b className={incident[3].toLowerCase()}>{incident[3]}</b><small>{incident[4]}</small></div>
              </button>
            ))}
          </div>
          <div className="incident-total">Total Active Incidents: <strong>3</strong></div>
        </section>
      </div>

      <div className="lower-grid">
        <section className="panel">
          <div className="panel-header">
            <div><h2>Medical Device Status</h2><span>Click a device to inspect or troubleshoot</span></div>
            <button type="button" onClick={() => setPage?.("Medical Devices")}>View All</button>
          </div>
          <div className="device-list">
            {devices.map((device) => (
              <button key={device[0]} type="button" className="device device-button" onClick={() => setSelectedDevice(device)}>
                <div className="device-icon"><Stethoscope size={20} /></div>
                <div className="device-info"><strong>{device[0]}</strong><span>{device[1]}</span></div>
                <div className={`device-status ${device[3] ? "offline" : "online"}`}>{device[3] ? <XCircle size={15} /> : <CheckCircle2 size={15} />}{device[2]}</div>
              </button>
            ))}
          </div>
        </section>

        <section className="panel ai-panel">
          <div className="ai-header"><div className="ai-icon"><Brain size={22} /></div><div><h2>AI Recommendation</h2><span>INC-2026-1001</span></div><div className="confidence">95%<small>Confidence</small></div></div>
          <div className="ai-root"><strong>Likely Root Cause</strong><p>Network connectivity interruption detected between the GE Voluson E10 ultrasound system and the imaging server.</p><div className="ai-cause"><Network size={17} /> Possible switch port error or network congestion</div></div>
          <div className="recommendations"><strong>Recommended Actions</strong><div><CheckCircle2 size={16} /> Check network switch port Gi1/0/24</div><div><CheckCircle2 size={16} /> Verify PACS connectivity</div><div><CheckCircle2 size={16} /> Review device network adapter</div></div>
          <button type="button" className="analysis-button" onClick={() => setPage?.("AI Insights")}><Brain size={17} /> View Full AI Analysis</button>
        </section>
      </div>

      <div className="metrics-row">
        <Metric icon={<Wifi />} label="Network" value="99.8%" />
        <Metric icon={<Database />} label="PACS" value="Operational" />
        <Metric icon={<Server />} label="Epic" value="Operational" />
        <Metric icon={<Clock3 />} label="Avg Resolution" value="18 min" />
        <Metric icon={<ShieldCheck />} label="Security" value="Protected" />
      </div>

      {selectedRoom && (
        <Modal title={selectedRoom[0]} onClose={() => setSelectedRoom(null)}>
          <div className={`detail-status ${selectedRoom[2] === "Critical" ? "danger" : ""}`}><span className={`room-status ${selectedRoom[2] === "Critical" ? "critical" : ""}`} /> {selectedRoom[2]}</div>
          <p>This room contains <strong>{selectedRoom[1]}</strong> connected {selectedRoom[1] === 1 ? "device" : "devices"}.</p>
          <div className="detail-grid">
            <div><span>Facility</span><strong>San Francisco Health Center</strong></div>
            <div><span>Monitoring</span><strong>Live</strong></div>
            <div><span>Network</span><strong>99.8%</strong></div>
            <div><span>Clinical integration</span><strong>HL7 / DICOM</strong></div>
          </div>
          {selectedRoom[2] === "Critical" && <div className="warning-box"><AlertCircle size={17} /><div><strong>Attention required</strong><p>A device in this room is reporting offline status.</p></div></div>}
          <div className="modal-actions">
            <button className="outline-btn" onClick={() => setSelectedRoom(null)}>Close</button>
            <button className="primary-btn troubleshoot-action" onClick={() => openRoomTroubleshooting(selectedRoom)}><Wrench size={15} /> Troubleshoot Room</button>
          </div>
        </Modal>
      )}

      {selectedDevice && (
        <Modal title={selectedDevice[0]} onClose={() => setSelectedDevice(null)}>
          <div className={`detail-status ${selectedDevice[3] ? "danger" : ""}`}><span className={`room-status ${selectedDevice[3] ? "critical" : ""}`} /> {selectedDevice[2]}</div>
          <div className="detail-grid">
            <div><span>Location</span><strong>{selectedDevice[1]}</strong></div>
            <div><span>Device type</span><strong>Clinical equipment</strong></div>
            <div><span>Connectivity</span><strong>{selectedDevice[3] ? "Attention required" : "Connected"}</strong></div>
            <div><span>Monitoring</span><strong>Live</strong></div>
          </div>
          <div className="warning-box"><Network size={17} /><div><strong>Integration status</strong><p>DICOM/PACS monitoring is active. Use Troubleshoot Device to run the simulated diagnostic workflow.</p></div></div>
          <div className="modal-actions">
            <button className="outline-btn" onClick={() => setSelectedDevice(null)}>Close</button>
            <button className="primary-btn troubleshoot-action" onClick={() => openDeviceTroubleshooting(selectedDevice)}><Wrench size={15} /> Troubleshoot Device</button>
          </div>
        </Modal>
      )}

      {troubleshootTarget && (
        <Modal title={`Troubleshoot ${troubleshootTarget.type === "device" ? troubleshootTarget.name : troubleshootTarget.name}`} onClose={() => setTroubleshootTarget(null)}>
          <div className="troubleshoot-header">
            <div className={`detail-status ${troubleshootTarget.status === "Offline" || troubleshootTarget.status === "Critical" ? "danger" : ""}`}>
              <Wrench size={15} /> {troubleshootTarget.status || "Operational"}
            </div>
            {troubleshootTarget.location && <span className="troubleshoot-location">{troubleshootTarget.location}</span>}
          </div>

          <div className="diagnostic-list">
            {[
              ["reachability", "Network reachability", "Ping / TCP connectivity test"],
              ["dicom", "DICOM / PACS connection", "Verify imaging destination communication"],
              ["telemetry", "Device telemetry", "Check heartbeat and last-seen timestamp"],
              ["logs", "Recent device logs", "Review the latest simulated error events"]
            ].map(([key, title, detail]) => {
              const state = diagnostics[key] || "pending";
              return (
                <div className="diagnostic-row" key={key}>
                  <div className="diagnostic-icon"><Activity size={15} /></div>
                  <div className="diagnostic-info"><strong>{title}</strong><span>{detail}</span></div>
                  <div className={`diagnostic-state ${state}`}>{state === "pending" ? "Not run" : state === "running" ? "Testing…" : state === "passed" ? "Passed" : "Failed"}</div>
                  <button type="button" className="diagnostic-button" onClick={() => runTest(key, key === "reachability" && troubleshootTarget.status !== "Offline" ? "passed" : "passed")} disabled={state === "running"}>
                    <Play size={12} /> Test
                  </button>
                </div>
              );
            })}
          </div>

          <div className="troubleshoot-note">
            <strong>IncidentIQ AI diagnostic workflow</strong>
            <p>These controls simulate the actions a production system would perform against network telemetry, DICOM/PACS transactions, device APIs and logs.</p>
          </div>

          <div className="modal-actions">
            <button className="outline-btn" onClick={() => setTroubleshootTarget(null)}>Close</button>
            <button className="primary-btn" onClick={() => { setTroubleshootTarget(null); setPage?.("Incidents"); }}>Create / View Incident</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return <div className="modal-backdrop" onClick={onClose}>
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="close" type="button" onClick={onClose}><X size={17} /></button>
      <div className="eyebrow">INCIDENTIQ AI</div>
      <h2>{title}</h2>
      {children}
    </div>
  </div>;
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="metric"><div className="metric-icon">{icon}</div><div><span>{label}</span><strong>{value}</strong></div></div>;
}
