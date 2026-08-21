import { useState } from "react";

const reports = [
 {name:"Daily Clinical IT Operations", type:"Operational", date:"Today, 08:00", detail:"142 devices · 3 active incidents · 96% system health"},
 {name:"Medical Device Availability", type:"Availability", date:"Today, 07:30", detail:"128 operational · 8 warnings · 6 offline"},
 {name:"Incident Trend & Root Cause", type:"Analytics", date:"Yesterday", detail:"18 incidents analyzed · 11 network-related · 5 PACS-related"},
 {name:"PACS / DICOM Connectivity", type:"Integration", date:"Yesterday", detail:"96.8% successful associations · 2 degraded endpoints"},
];

export default function Reports() {
 const [selected,setSelected]=useState<any>(null);
 return <>
  <div className="page-heading"><div><h1>Reports</h1><p>Healthcare IT operational, device and incident reporting</p></div><span className="simulation">SIMULATED CLINICAL DATA</span></div>
  <div className="metrics compact">
   <Metric label="System Health" value="96%" sub="Current snapshot"/><Metric label="Devices" value="142" sub="Tracked assets"/><Metric label="Incidents" value="18" sub="30-day total"/><Metric label="PACS Success" value="96.8%" sub="DICOM associations"/>
  </div>
  <section className="panel table-panel"><div className="panel-title"><div><h2>Available Reports</h2><span>Select a report to view the generated operational snapshot</span></div></div>
   <div className="report-list">{reports.map(r=><button className="report-card" key={r.name} onClick={()=>setSelected(r)}><span className="report-icon">▤</span><span><strong>{r.name}</strong><small>{r.type} · {r.date}</small><em>{r.detail}</em></span><b>View →</b></button>)}</div>
  </section>
  {selected&&<div className="modal-backdrop" onClick={()=>setSelected(null)}><div className="modal report-detail" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSelected(null)}>×</button><small>{selected.type.toUpperCase()} REPORT</small><h2>{selected.name}</h2><p>Generated from the IncidentIQ AI simulated healthcare operations dataset.</p><div className="report-kpis"><div><span>Snapshot</span><strong>{selected.date}</strong></div><div><span>Summary</span><strong>{selected.detail}</strong></div></div><div className="ai-analysis"><div className="ai-head"><span className="ai-icon">✦</span><div><strong>AI Report Insight</strong><small>Automated analysis</small></div></div><p>The report highlights current operational conditions and identifies areas for technical follow-up. In a production deployment, this view would be generated from live monitoring, CMMS, PACS, HL7 and incident-management data.</p></div><div className="modal-actions"><button className="outline-btn" onClick={()=>setSelected(null)}>Close</button><button className="primary-btn" onClick={()=>window.print()}>Print / Save PDF</button></div></div></div>}
 </>;
}
function Metric({label,value,sub}:any){return <div className="metric simple"><div><span>{label}</span><strong>{value}</strong><small>{sub}</small></div></div>}
