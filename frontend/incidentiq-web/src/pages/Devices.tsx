import { useState } from "react";
import { CheckCircle2, Cpu, HeartPulse, Network, Play, Wrench, X, XCircle } from "lucide-react";

const devices = [
  ["GE Voluson E10", "Ultrasound Room", "Offline", true],
  ["Hologic Selenia Dimensions", "Mammography Room", "Operational", false],
  ["Mindray BeneVision N1", "Exam Room 2", "Operational", false],
  ["Siemens Lab Analyzer", "Lab Room", "Operational", false],
  ["Philips IntelliVue MX550", "Nurse Station", "Operational", false],
  ["PACS Imaging Gateway", "Server Room", "Operational", false]
] as const;

export default function Devices() {
  const [selected, setSelected] = useState<(typeof devices)[number] | null>(null);
  const [troubleshooting, setTroubleshooting] = useState(false);
  const [tests, setTests] = useState<Record<string, "pending" | "running" | "passed">>({});

  const runTest = (key: string) => {
    setTests((v) => ({ ...v, [key]: "running" }));
    window.setTimeout(() => setTests((v) => ({ ...v, [key]: "passed" })), 450);
  };

  return (
    <div>
      <div className="page-heading">
        <div><div className="eyebrow">CLINICAL TECHNOLOGY</div><h1>Medical Devices</h1><p>Connected clinical equipment and current device health. Select a device to inspect and troubleshoot it.</p></div>
        <div className="live-status"><span className="pulse" /> LIVE MONITORING</div>
      </div>

      <div className="summary-grid">
        <div className="summary-card blue"><div className="summary-icon"><Cpu /></div><div><span>Total Devices</span><strong>142</strong><small>128 online</small></div></div>
        <div className="summary-card red"><div className="summary-icon"><XCircle /></div><div><span>Offline</span><strong>6</strong><small>requires attention</small></div></div>
        <div className="summary-card green"><div className="summary-icon"><CheckCircle2 /></div><div><span>Operational</span><strong>128</strong><small>90% of fleet</small></div></div>
        <div className="summary-card purple"><div className="summary-icon"><Network /></div><div><span>Connected</span><strong>99.8%</strong><small>network availability</small></div></div>
      </div>

      <section className="panel device-page-panel">
        <div className="panel-header"><div><h2>Device Inventory</h2><span>Clinical and supporting infrastructure</span></div><span className="inventory-hint">Select a card → Inspect → Troubleshoot</span></div>
        <div className="device-grid">
          {devices.map((device) => (
            <button className={`device device-button ${device[3] ? "device-offline" : ""}`} type="button" key={device[0]} onClick={() => { setSelected(device); setTroubleshooting(false); }}>
              <div className="device-icon"><HeartPulse size={19} /></div>
              <div className="device-info"><strong>{device[0]}</strong><span>{device[1]}</span></div>
              <div className={`device-status ${device[3] ? "offline" : "online"}`}>{device[3] ? <XCircle size={15} /> : <CheckCircle2 size={15} />}{device[2]}</div>
              <span className="device-open"><Wrench size={11} /> Inspect</span>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" type="button" onClick={() => setSelected(null)}><X size={17} /></button>
            <div className="eyebrow">DEVICE MONITORING</div>
            <h2>{selected[0]}</h2>
            <div className={`detail-status ${selected[3] ? "danger" : ""}`}><span className={`room-status ${selected[3] ? "critical" : ""}`} /> {selected[2]}</div>

            {!troubleshooting ? (
              <>
                <div className="detail-grid">
                  <div><span>Location</span><strong>{selected[1]}</strong></div>
                  <div><span>Device class</span><strong>Clinical equipment</strong></div>
                  <div><span>Network</span><strong>{selected[3] ? "Attention required" : "Connected"}</strong></div>
                  <div><span>PACS / DICOM</span><strong>{selected[3] ? "Degraded" : "Operational"}</strong></div>
                </div>
                <div className="warning-box"><Network size={17} /><div><strong>Device controls</strong><p>Select Troubleshoot Device to run connectivity, DICOM/PACS, telemetry and log checks.</p></div></div>
                <div className="modal-actions">
                  <button className="outline-btn" onClick={() => setSelected(null)}>Close</button>
                  <button className="primary-btn troubleshoot-action" onClick={() => setTroubleshooting(true)}><Wrench size={15} /> Troubleshoot Device</button>
                </div>
              </>
            ) : (
              <>
                <div className="diagnostic-list">
                  {[
                    ["reachability", "Network reachability", "Ping / TCP connectivity"],
                    ["dicom", "DICOM / PACS", "Imaging server communication"],
                    ["telemetry", "Device telemetry", "Heartbeat / last-seen status"],
                    ["logs", "Recent logs", "Latest simulated error events"]
                  ].map(([key, title, detail]) => {
                    const state = tests[key] || "pending";
                    return (
                      <div className="diagnostic-row" key={key}>
                        <div className="diagnostic-icon"><ActivityIcon /></div>
                        <div className="diagnostic-info"><strong>{title}</strong><span>{detail}</span></div>
                        <div className={`diagnostic-state ${state}`}>{state === "pending" ? "Not run" : state === "running" ? "Testing…" : "Passed"}</div>
                        <button type="button" className="diagnostic-button" disabled={state === "running"} onClick={() => runTest(key)}><Play size={12} /> Test</button>
                      </div>
                    );
                  })}
                </div>
                <div className="troubleshoot-note"><strong>Production integration point</strong><p>In a live deployment, these checks would query device telemetry, SNMP/network data, DICOM transactions, vendor APIs and incident history.</p></div>
                <div className="modal-actions">
                  <button className="outline-btn" onClick={() => setTroubleshooting(false)}>Back to Device</button>
                  <button className="primary-btn" onClick={() => setSelected(null)}>Finish Troubleshooting</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ActivityIcon() {
  return <Wrench size={15} />;
}
