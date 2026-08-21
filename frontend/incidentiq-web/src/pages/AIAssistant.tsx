import { Brain, CheckCircle2, Network, Sparkles } from "lucide-react";

export default function AIAssistant() {
  return (
    <div>
      <div className="page-heading"><div><div className="eyebrow">ARTIFICIAL INTELLIGENCE</div><h1>AI Insights</h1><p>AI-assisted root-cause analysis and recommended remediation.</p></div><div className="live-status"><Sparkles size={14} /> AI ENGINE ONLINE</div></div>
      <div className="lower-grid">
        <section className="panel ai-panel">
          <div className="ai-header"><div className="ai-icon"><Brain size={22} /></div><div><h2>AI Recommendation</h2><span>INC-2026-1001 • Ultrasound System Offline</span></div><div className="confidence">95%<small>Confidence</small></div></div>
          <div className="ai-root"><strong>Likely Root Cause</strong><p>Network connectivity interruption detected between the GE Voluson E10 ultrasound system and the imaging server.</p><div className="ai-cause"><Network size={17} /> Possible switch port error or network congestion</div></div>
          <div className="recommendations"><strong>Recommended Actions</strong><div><CheckCircle2 size={16} /> Check network switch port Gi1/0/24</div><div><CheckCircle2 size={16} /> Verify PACS connectivity</div><div><CheckCircle2 size={16} /> Review device network adapter</div></div>
          <button type="button" className="analysis-button"><Brain size={17} /> Run Another Analysis</button>
        </section>
        <section className="panel"><div className="panel-header"><div><h2>AI Operational Summary</h2><span>Past 24 hours</span></div></div><div className="utility-grid"><div className="utility-card"><strong>Root Causes Identified</strong><span>14</span></div><div className="utility-card"><strong>Recommendations</strong><span>18</span></div><div className="utility-card"><strong>Prevented Incidents</strong><span>5</span></div></div></section>
      </div>
    </div>
  );
}
