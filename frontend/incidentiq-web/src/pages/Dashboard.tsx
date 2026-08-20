import {
  AlertCircle,
  Activity,
  Brain,
  CheckCircle2,
  Clock3,
  Cpu,
  Database,
  FileWarning,
  HeartPulse,
  Network,
  Server,
  ShieldCheck,
  Stethoscope,
  Wifi,
  XCircle
} from "lucide-react";

const rooms = [
  {
    name: "Exam Room 1",
    devices: 2,
    status: "Operational",
    type: "normal"
  },
  {
    name: "Exam Room 2",
    devices: 3,
    status: "Operational",
    type: "normal"
  },
  {
    name: "Ultrasound Room",
    devices: 1,
    status: "Critical",
    type: "critical"
  },
  {
    name: "Lab Room",
    devices: 2,
    status: "Operational",
    type: "normal"
  },
  {
    name: "Waiting Area",
    devices: 0,
    status: "Operational",
    type: "normal"
  },
  {
    name: "Nurse Station",
    devices: 4,
    status: "Operational",
    type: "normal"
  },
  {
    name: "Consult Room",
    devices: 1,
    status: "Operational",
    type: "normal"
  },
  {
    name: "Check-In Area",
    devices: 2,
    status: "Operational",
    type: "normal"
  }
];

const incidents = [
  {
    id: "INC-2026-1001",
    title: "Ultrasound System Offline",
    location: "Ultrasound Room",
    severity: "CRITICAL",
    time: "2 min ago"
  },
  {
    id: "INC-2026-1002",
    title: "PACS Image Retrieve Slow",
    location: "Nurse Station",
    severity: "HIGH",
    time: "15 min ago"
  },
  {
    id: "INC-2026-1003",
    title: "Printer Not Responding",
    location: "Front Desk",
    severity: "MEDIUM",
    time: "45 min ago"
  }
];

const devices = [
  {
    name: "GE Voluson E10",
    location: "Ultrasound Room",
    status: "Offline",
    critical: true
  },
  {
    name: "Hologic Selenia Dimensions",
    location: "Mammography Room",
    status: "Operational",
    critical: false
  },
  {
    name: "Mindray BeneVision N1",
    location: "Exam Room 2",
    status: "Operational",
    critical: false
  },
  {
    name: "Siemens Lab Analyzer",
    location: "Lab Room",
    status: "Operational",
    critical: false
  }
];

export default function Dashboard() {
  return (
    <div className="incident-dashboard">

      {/* HEADER */}

      <header className="top-header">

        <div className="brand">
          <div className="brand-icon">
            <HeartPulse size={24} />
          </div>

          <div>
            <div className="brand-name">
              IncidentIQ <span>AI</span>
            </div>

            <div className="brand-subtitle">
              Healthcare IT Incident Management
            </div>
          </div>
        </div>

        <div className="search-box">
          <span>⌕</span>
          Search incidents, devices, rooms, or keywords...
          <kbd>Ctrl K</kbd>
        </div>

        <div className="header-user">
          <div className="notification">
            <AlertCircle size={20} />
            <b>12</b>
          </div>

          <div className="avatar">
            MZ
          </div>

          <div>
            <strong>Mark Zotman</strong>
            <small>Systems Engineer</small>
          </div>
        </div>

      </header>

      <div className="dashboard-layout">

        {/* SIDEBAR */}

        <aside className="sidebar">

          <div className="facility-selector">
            <div className="facility-icon">
              <HeartPulse size={20} />
            </div>

            <div>
              <strong>Planned Parenthood</strong>
              <span>Northern California</span>
            </div>

            <span>⌄</span>
          </div>

          <nav>

            <div className="nav-section">
              OPERATIONS
            </div>

            <div className="nav-item active">
              <Activity size={18} />
              Dashboard
            </div>

            <div className="nav-item">
              <FileWarning size={18} />
              Incidents
              <span className="nav-badge">3</span>
            </div>

            <div className="nav-item">
              <Cpu size={18} />
              Rooms & Devices
            </div>

            <div className="nav-item">
              <Brain size={18} />
              AI Insights
            </div>

            <div className="nav-item">
              <AlertCircle size={18} />
              Alerts
            </div>

            <div className="nav-section">
              SYSTEMS
            </div>

            <div className="nav-item">
              <Stethoscope size={18} />
              Medical Devices
            </div>

            <div className="nav-item">
              <Database size={18} />
              Reports
            </div>

            <div className="nav-item">
              <ShieldCheck size={18} />
              Knowledge Base
            </div>

            <div className="nav-item">
              <Network size={18} />
              Integrations
            </div>

            <div className="nav-item">
              <Server size={18} />
              Settings
            </div>

          </nav>

          <div className="system-status">

            <div className="system-title">
              SYSTEM STATUS
            </div>

            <div>
              <span className="status-dot green" />
              HL7 Interface
              <b>Operational</b>
            </div>

            <div>
              <span className="status-dot green" />
              PACS Connection
              <b>Operational</b>
            </div>

            <div>
              <span className="status-dot green" />
              Epic EHR
              <b>Operational</b>
            </div>

            <div>
              <span className="status-dot green" />
              FHIR API
              <b>Operational</b>
            </div>

          </div>

          <div className="sidebar-footer">
            © 2026 IncidentIQ AI
          </div>

        </aside>

        {/* MAIN */}

        <main className="main-content">

          <div className="page-heading">

            <div>
              <div className="eyebrow">
                HEALTHCARE IT OPERATIONS
              </div>

              <h1>Facility Overview</h1>

              <p>
                Planned Parenthood Northern California — San Francisco Health Center
              </p>
            </div>

            <div className="live-status">
              <span className="pulse" />
              LIVE MONITORING
            </div>

          </div>

          {/* SUMMARY CARDS */}

          <div className="summary-grid">

            <SummaryCard
              title="Total Devices"
              value="142"
              detail="128 online"
              icon={<Cpu />}
              color="blue"
            />

            <SummaryCard
              title="Active Incidents"
              value="3"
              detail="1 critical"
              icon={<FileWarning />}
              color="red"
            />

            <SummaryCard
              title="AI Insights"
              value="24"
              detail="5 prevented incidents"
              icon={<Brain />}
              color="purple"
            />

            <SummaryCard
              title="System Health"
              value="96%"
              detail="All core systems operational"
              icon={<Activity />}
              color="green"
            />

          </div>

          {/* FACILITY + INCIDENTS */}

          <div className="content-grid">

            <section className="panel facility-panel">

              <div className="panel-header">

                <div>
                  <h2>Facility Floorplan</h2>
                  <span>Rooms & connected medical devices</span>
                </div>

                <div className="legend">
                  <span>
                    <i className="legend-green" />
                    Operational
                  </span>

                  <span>
                    <i className="legend-yellow" />
                    Warning
                  </span>

                  <span>
                    <i className="legend-red" />
                    Critical
                  </span>
                </div>

              </div>

              <div className="floorplan">

                {rooms.map((room) => (

                  <div
                    key={room.name}
                    className={`room ${room.type}`}
                  >

                    <div className="room-header">

                      <strong>
                        {room.name}
                      </strong>

                      <span
                        className={
                          room.type === "critical"
                            ? "room-status critical"
                            : "room-status"
                        }
                      />

                    </div>

                    <span>
                      {room.devices}{" "}
                      {room.devices === 1 ? "Device" : "Devices"}
                    </span>

                    {room.type === "critical" && (
                      <div className="critical-label">
                        <AlertCircle size={13} />
                        DEVICE OFFLINE
                      </div>
                    )}

                  </div>

                ))}

              </div>

            </section>

            {/* ACTIVE INCIDENTS */}

            <section className="panel">

              <div className="panel-header">

                <div>
                  <h2>Active Incidents</h2>
                  <span>Requires attention</span>
                </div>

                <button>
                  View All
                </button>

              </div>

              <div className="incident-list">

                {incidents.map((incident) => (

                  <div
                    className="incident"
                    key={incident.id}
                  >

                    <div
                      className={`severity ${incident.severity.toLowerCase()}`}
                    />

                    <div className="incident-info">

                      <strong>
                        {incident.title}
                      </strong>

                      <span>
                        {incident.id} • {incident.location}
                      </span>

                    </div>

                    <div className="incident-right">

                      <b className={incident.severity.toLowerCase()}>
                        {incident.severity}
                      </b>

                      <small>
                        {incident.time}
                      </small>

                    </div>

                  </div>

                ))}

              </div>

              <div className="incident-total">
                Total Active Incidents:
                <strong> 3</strong>
              </div>

            </section>

          </div>

          {/* LOWER GRID */}

          <div className="lower-grid">

            {/* DEVICES */}

            <section className="panel">

              <div className="panel-header">

                <div>
                  <h2>Medical Device Status</h2>
                  <span>Connected clinical equipment</span>
                </div>

                <button>
                  View All
                </button>

              </div>

              <div className="device-list">

                {devices.map((device) => (

                  <div
                    className="device"
                    key={device.name}
                  >

                    <div className="device-icon">
                      <Stethoscope size={20} />
                    </div>

                    <div className="device-info">

                      <strong>
                        {device.name}
                      </strong>

                      <span>
                        {device.location}
                      </span>

                    </div>

                    <div
                      className={
                        device.critical
                          ? "device-status offline"
                          : "device-status online"
                      }
                    >
                      {device.critical
                        ? <XCircle size={15} />
                        : <CheckCircle2 size={15} />
                      }

                      {device.status}
                    </div>

                  </div>

                ))}

              </div>

            </section>

            {/* AI INSIGHT */}

            <section className="panel ai-panel">

              <div className="ai-header">

                <div className="ai-icon">
                  <Brain size={22} />
                </div>

                <div>
                  <h2>AI Recommendation</h2>
                  <span>INC-2026-1001</span>
                </div>

                <div className="confidence">
                  95%
                  <small>Confidence</small>
                </div>

              </div>

              <div className="ai-root">

                <strong>
                  Likely Root Cause
                </strong>

                <p>
                  Network connectivity interruption detected between
                  the GE Voluson E10 ultrasound system and the imaging
                  server.
                </p>

                <div className="ai-cause">
                  <Network size={17} />
                  Possible switch port error or network congestion
                </div>

              </div>

              <div className="recommendations">

                <strong>
                  Recommended Actions
                </strong>

                <div>
                  <CheckCircle2 size={16} />
                  Check network switch port Gi1/0/24
                </div>

                <div>
                  <CheckCircle2 size={16} />
                  Verify PACS connectivity
                </div>

                <div>
                  <CheckCircle2 size={16} />
                  Review device network adapter
                </div>

              </div>

              <button className="analysis-button">
                <Brain size={17} />
                View Full AI Analysis
              </button>

            </section>

          </div>

          {/* FOOTER METRICS */}

          <div className="metrics-row">

            <Metric
              icon={<Wifi />}
              label="Network"
              value="99.8%"
            />

            <Metric
              icon={<Database />}
              label="PACS"
              value="Operational"
            />

            <Metric
              icon={<Server />}
              label="Epic"
              value="Operational"
            />

            <Metric
              icon={<Clock3 />}
              label="Avg Resolution"
              value="18 min"
            />

            <Metric
              icon={<ShieldCheck />}
              label="Security"
              value="Protected"
            />

          </div>

        </main>

      </div>

    </div>
  );
}


/* SUMMARY CARD */

function SummaryCard({
  title,
  value,
  detail,
  icon,
  color
}: {
  title: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={`summary-card ${color}`}>

      <div className="summary-icon">
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>

    </div>
  );
}


/* METRIC */

function Metric({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="metric">

      <div className="metric-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}