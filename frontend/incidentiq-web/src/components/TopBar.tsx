import { Bell, HeartPulse } from "lucide-react";

export default function TopBar() {
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
        <div className="notification">
          <Bell size={18} />
          <b>12</b>
        </div>
        <div className="user-avatar">MZ</div>
        <div className="user-info">
          <strong>Mark Zotman</strong>
          <small>Systems Engineer</small>
        </div>
      </div>
    </header>
  );
}
