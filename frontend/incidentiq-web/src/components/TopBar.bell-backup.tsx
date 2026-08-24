import type { FormEvent } from "react";
import { useState } from "react";
import {
  Bell,
  HeartPulse,
  X,
  Mail,
  Building2,
  Send,
} from "lucide-react";

type ContactForm = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
};

export default function TopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const [form, setForm] = useState<ContactForm>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    interest: "Healthcare / Hospital",
    message: "",
  });

  const notifications = [
    {
      level: "CRITICAL",
      title: "Ultrasound System Offline",
      detail: "Ultrasound Room • 2 min ago",
    },
    {
      level: "HIGH",
      title: "PACS Image Retrieve Slow",
      detail: "Nurse Station • 15 min ago",
    },
    {
      level: "MEDIUM",
      title: "Printer Not Responding",
      detail: "Front Desk • 45 min ago",
    },
    {
      level: "AI",
      title: "AI Analysis Complete",
      detail: "GE Voluson E10 • Just now",
    },
  ];

  function openContact() {
    setNotificationsOpen(false);
    setContactOpen(true);
  }

  function closeContact() {
    setContactOpen(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const subject = encodeURIComponent(
      `IncidentIQ AI Inquiry - ${form.interest}`
    );

    const body = encodeURIComponent(
      `IncidentIQ AI Contact / Demo Inquiry

Name: ${form.name}
Organization: ${form.organization}
Email: ${form.email}
Phone: ${form.phone}
Interest: ${form.interest}

Message:
${form.message}
`
    );

    window.location.href = `mailto:zotmanjobs@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-left">
          <div className="topbar-brand">
            <div className="topbar-brand-icon">
              <HeartPulse size={19} />
            </div>

            <div>
              <div className="topbar-brand-name">Healthcare Operations Center</div>
              <div className="topbar-brand-subtitle">
                Simulation Environment
              </div>
            </div>
          </div>
        </div>

        <div className="topbar-right">
          {/* Contact / Demo */}
          <button
            type="button"
            className="contact-topbar-button"
            onClick={openContact}
          >
            Contact / Demo
          </button>

          {/* Notifications */}
          <div className="notification-wrapper">
            <button
              type="button"
              className="notification-button"
              onClick={() =>
                setNotificationsOpen((previous) => !previous)
              }
              aria-label="Open notifications"
            >
              <Bell size={20} />

              <span className="notification-badge">12</span>
            </button>

            {notificationsOpen && (
              <div className="notification-panel">
                <div className="notification-panel-header">
                  <div>
                    <strong>Notifications</strong>
                    <span>12 total notifications</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    aria-label="Close notifications"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="notification-list">
                  {notifications.map((notification, index) => (
                    <div
                      className={`notification-item notification-${notification.level.toLowerCase()}`}
                      key={`${notification.title}-${index}`}
                    >
                      <div className="notification-item-indicator" />

                      <div className="notification-item-content">
                        <div className="notification-item-title">
                          {notification.title}
                        </div>

                        <div className="notification-item-detail">
                          {notification.detail}
                        </div>
                      </div>

                      <span className="notification-level">
                        {notification.level}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="notification-footer">
                  <span>12 total notifications</span>

                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User */}
          <div className="topbar-user">
            <div className="topbar-user-avatar">MZ</div>

            <div className="topbar-user-info">
              <strong>Mark Zotman</strong>
              <span>Systems Engineer</span>
            </div>
          </div>
        </div>
      </header>

      {/* Contact / Demo Modal */}
      {contactOpen && (
        <div
          className="contact-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeContact();
            }
          }}
        >
          <div className="contact-modal">
            <div className="contact-modal-header">
              <div>
                <div className="contact-modal-eyebrow">
                  INCIDENTIQ AI
                </div>

                <h2>Contact Mark Zotman</h2>

                <p>
                  Interested in IncidentIQ AI, healthcare IT,
                  medical-device integration, partnerships, or
                  investment opportunities?
                </p>
              </div>

              <button
                type="button"
                className="contact-close-button"
                onClick={closeContact}
                aria-label="Close contact form"
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="contact-form-grid">
                <label>
                  <span>Name *</span>

                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="Your name"
                  />
                </label>

                <label>
                  <span>Organization *</span>

                  <input
                    required
                    type="text"
                    value={form.organization}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        organization: event.target.value,
                      })
                    }
                    placeholder="Hospital, company, fund..."
                  />
                </label>

                <label>
                  <span>Email *</span>

                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        email: event.target.value,
                      })
                    }
                    placeholder="name@organization.com"
                  />
                </label>

                <label>
                  <span>Phone</span>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        phone: event.target.value,
                      })
                    }
                    placeholder="Optional"
                  />
                </label>
              </div>

              <label>
                <span>What are you interested in? *</span>

                <select
                  required
                  value={form.interest}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      interest: event.target.value,
                    })
                  }
                >
                  <option value="IncidentIQ AI Demo">
                    IncidentIQ AI Demo
                  </option>

                  <option value="Healthcare / Hospital">
                    Hospital / Healthcare Organization
                  </option>

                  <option value="Medical Device Company">
                    Medical Device Company
                  </option>

                  <option value="Investor / Funding">
                    Investor / Funding
                  </option>

                  <option value="Partnership">
                    Partnership
                  </option>

                  <option value="Healthcare IT Consulting">
                    Healthcare IT Consulting
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </label>

              <label>
                <span>How can I help? *</span>

                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      message: event.target.value,
                    })
                  }
                  placeholder="Tell me what you're interested in, what problem you're trying to solve, or what you'd like to see in an IncidentIQ AI demo."
                />
              </label>

              <div className="contact-modal-footer">
                <div className="contact-business-note">
                  <Building2 size={17} />

                  <span>
                    Healthcare IT • Medical Devices • AI
                  </span>
                </div>

                <button
                  type="submit"
                  className="contact-submit-button"
                >
                  <Send size={16} />
                  Send Inquiry
                </button>
              </div>
            </form>

            <div className="contact-email">
              <Mail size={15} />
              <span>zotmanjobs@gmail.com</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}