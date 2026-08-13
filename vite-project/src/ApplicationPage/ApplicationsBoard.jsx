import { useState } from "react";

// ---------- Shared colors (matching the CareerCompass screenshot) ----------
const PAGE_BG = "#F6F5FB";
const PURPLE = "#6D28D9";
const PURPLE_LIGHT = "#EDE9FE";
const TEXT_DARK = "#111827";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const CARD_BG = "#FFFFFF";

const DOT_COLORS = {
  saved: "#9CA3AF",
  applied: "#3B82F6",
  interview: "#F97316",
  offer: "#22C55E",
};

const COLUMNS = [
  { key: "saved", label: "SAVED" },
  { key: "applied", label: "APPLIED" },
  { key: "interview", label: "INTERVIEW" },
  { key: "offer", label: "OFFER" },
];

// These four categories let the user group applications by role type,
// regardless of which company or listing site the application came from.
const CATEGORIES = [
  { key: "all", label: "All Roles" },
  { key: "software-engineering", label: "Software Engineering" },
  { key: "full-stack", label: "Full Stack Developer" },
  { key: "front-end", label: "Front-End" },
  { key: "back-end", label: "Back-End" },
];

let idCounter = 500;
const nextId = () => `app-${idCounter++}`;

function ApplicationsBoard(props) {
  const { initialApplications, onApplicationsChange } = props;

  const [applications, setApplications] = useState(
    initialApplications || [
      {
        id: nextId(),
        company: "BRCK",
        role: "Junior Full Stack",
        column: "saved",
        status: "Prepare and apply",
        lastUpdated: "Aug 5",
        category: "full-stack",
      },
      {
        id: nextId(),
        company: "Safaricom",
        role: "Software Engineering Intern",
        column: "applied",
        status: "Awaiting response",
        lastUpdated: "Aug 5",
        category: "software-engineering",
      },
      {
        id: nextId(),
        company: "Andela",
        role: "Frontend Developer Intern",
        column: "interview",
        status: "Technical Interview — Aug 12",
        lastUpdated: "Aug 7",
        category: "front-end",
      },
      {
        id: nextId(),
        company: "Flutterwave",
        role: "Frontend Engineer Intern",
        column: "offer",
        status: "Respond to offer by Aug 20",
        lastUpdated: "Aug 8",
        category: "front-end",
      },
      {
        id: nextId(),
        company: "Microsoft",
        role: "AI Research Intern",
        column: "applied",
        status: "Awaiting response",
        lastUpdated: "Aug 7",
        category: "software-engineering",
      },
      {
        id: nextId(),
        company: "Twiga Foods",
        role: "React Developer Intern",
        column: "interview",
        status: "Coding challenge — Aug 14",
        lastUpdated: "Aug 4",
        category: "front-end",
      },
    ],
  );

  const [view, setView] = useState("kanban"); // "kanban" | "list"
  const [categoryFilter, setCategoryFilter] = useState("all");

  const updateApplications = (updated) => {
    setApplications(updated);
    if (onApplicationsChange) onApplicationsChange(updated);
  };

  const handleFieldChange = (id, field, value) => {
    updateApplications(
      applications.map((app) =>
        app.id === id ? { ...app, [field]: value } : app,
      ),
    );
  };

  const handleColumnChange = (id, newColumn) => {
    updateApplications(
      applications.map((app) =>
        app.id === id ? { ...app, column: newColumn } : app,
      ),
    );
  };

  const handleAddApplication = () => {
    updateApplications([
      ...applications,
      {
        id: nextId(),
        company: "New Company",
        role: "Role title",
        column: "saved",
        status: "Prepare and apply",
        lastUpdated: "Today",
        category: "software-engineering",
      },
    ]);
  };

  const handleRemoveApplication = (id) => {
    updateApplications(applications.filter((app) => app.id !== id));
  };

  const filteredApplications =
    categoryFilter === "all"
      ? applications
      : applications.filter((app) => app.category === categoryFilter);

  const fieldStyle = {
    border: "none",
    borderBottom: `1px dashed ${BORDER}`,
    background: "transparent",
    color: TEXT_DARK,
    fontSize: "13px",
    padding: "1px 0",
    outline: "none",
    width: "100%",
  };

  const pillButtonStyle = (active) => ({
    border: `1px solid ${active ? PURPLE : BORDER}`,
    backgroundColor: active ? PURPLE_LIGHT : "white",
    color: active ? PURPLE : TEXT_MUTED,
    fontSize: "13px",
    padding: "6px 14px",
    borderRadius: "999px",
    cursor: "pointer",
    marginRight: "8px",
    marginBottom: "8px",
  });

  return (
    <div
      style={{
        backgroundColor: PAGE_BG,
        minHeight: "100%",
        padding: "32px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: TEXT_DARK,
              margin: 0,
            }}
          >
            Applications
          </h1>
          <p style={{ color: TEXT_MUTED, marginTop: "4px" }}>
            {filteredApplications.length} total applications
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              border: `1px solid ${BORDER}`,
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <button
              style={{
                border: "none",
                padding: "8px 16px",
                fontSize: "13px",
                cursor: "pointer",
                backgroundColor: view === "kanban" ? PURPLE_LIGHT : "white",
                color: view === "kanban" ? PURPLE : TEXT_MUTED,
              }}
              onClick={() => setView("kanban")}
            >
              ⊞ Kanban
            </button>
            <button
              style={{
                border: "none",
                padding: "8px 16px",
                fontSize: "13px",
                cursor: "pointer",
                backgroundColor: view === "list" ? PURPLE_LIGHT : "white",
                color: view === "list" ? PURPLE : TEXT_MUTED,
              }}
              onClick={() => setView("list")}
            >
              ☰ List
            </button>
          </div>

          <button
            style={{
              backgroundColor: PURPLE,
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={handleAddApplication}
          >
            + Add Application
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            style={pillButtonStyle(categoryFilter === cat.key)}
            onClick={() => setCategoryFilter(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Kanban view */}
      {view === "kanban" && (
        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            overflowX: "auto",
          }}
        >
          {COLUMNS.map((col) => {
            const columnApps = filteredApplications.filter(
              (app) => app.column === col.key,
            );
            return (
              <div key={col.key} style={{ minWidth: "260px", flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: DOT_COLORS[col.key],
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "1px",
                      color: TEXT_MUTED,
                    }}
                  >
                    {col.label}
                  </span>
                  <span
                    style={{
                      backgroundColor: BORDER,
                      color: TEXT_MUTED,
                      fontSize: "11px",
                      padding: "1px 7px",
                      borderRadius: "999px",
                      marginLeft: "4px",
                    }}
                  >
                    {columnApps.length}
                  </span>
                </div>

                {columnApps.map((app) => (
                  <div
                    key={app.id}
                    style={{
                      backgroundColor: CARD_BG,
                      border: `1px solid ${BORDER}`,
                      borderRadius: "10px",
                      padding: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          backgroundColor: PURPLE_LIGHT,
                          color: PURPLE,
                          fontWeight: "bold",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "10px",
                        }}
                      >
                        {app.company.charAt(0).toUpperCase()}
                      </div>
                      <button
                        style={{
                          border: "none",
                          background: "transparent",
                          color: "#EF4444",
                          cursor: "pointer",
                          fontSize: "12px",
                        }}
                        onClick={() => handleRemoveApplication(app.id)}
                      >
                        ✕
                      </button>
                    </div>

                    <input
                      style={{
                        ...fieldStyle,
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: TEXT_DARK,
                      }}
                      value={app.company}
                      onChange={(e) =>
                        handleFieldChange(app.id, "company", e.target.value)
                      }
                    />
                    <input
                      style={fieldStyle}
                      value={app.role}
                      onChange={(e) =>
                        handleFieldChange(app.id, "role", e.target.value)
                      }
                    />
                    <input
                      style={{
                        ...fieldStyle,
                        color: TEXT_MUTED,
                        marginTop: "6px",
                      }}
                      value={app.status}
                      onChange={(e) =>
                        handleFieldChange(app.id, "status", e.target.value)
                      }
                    />

                    <div
                      style={{
                        borderTop: `1px solid ${BORDER}`,
                        marginTop: "10px",
                        paddingTop: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ color: TEXT_MUTED, fontSize: "12px" }}>
                        Last:{" "}
                        <input
                          style={{
                            ...fieldStyle,
                            display: "inline",
                            width: "60px",
                            fontSize: "12px",
                          }}
                          value={app.lastUpdated}
                          onChange={(e) =>
                            handleFieldChange(
                              app.id,
                              "lastUpdated",
                              e.target.value,
                            )
                          }
                        />
                      </span>
                      <select
                        style={{
                          fontSize: "12px",
                          border: `1px solid ${BORDER}`,
                          borderRadius: "6px",
                          padding: "2px 4px",
                          color: TEXT_MUTED,
                        }}
                        value={app.column}
                        onChange={(e) =>
                          handleColumnChange(app.id, e.target.value)
                        }
                      >
                        {COLUMNS.map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
        <div
          style={{
            backgroundColor: CARD_BG,
            border: `1px solid ${BORDER}`,
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: PAGE_BG, textAlign: "left" }}>
                {[
                  "Company",
                  "Role",
                  "Status",
                  "Category",
                  "Stage",
                  "Last Updated",
                  "",
                ].map((heading) => (
                  <th
                    key={heading}
                    style={{
                      padding: "10px 16px",
                      fontSize: "12px",
                      color: TEXT_MUTED,
                      letterSpacing: "1px",
                    }}
                  >
                    {heading.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} style={{ borderTop: `1px solid ${BORDER}` }}>
                  <td style={{ padding: "10px 16px" }}>
                    <input
                      style={{ ...fieldStyle, fontWeight: "bold" }}
                      value={app.company}
                      onChange={(e) =>
                        handleFieldChange(app.id, "company", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <input
                      style={fieldStyle}
                      value={app.role}
                      onChange={(e) =>
                        handleFieldChange(app.id, "role", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <input
                      style={fieldStyle}
                      value={app.status}
                      onChange={(e) =>
                        handleFieldChange(app.id, "status", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <select
                      style={{
                        fontSize: "13px",
                        border: `1px solid ${BORDER}`,
                        borderRadius: "6px",
                        padding: "3px",
                      }}
                      value={app.category}
                      onChange={(e) =>
                        handleFieldChange(app.id, "category", e.target.value)
                      }
                    >
                      {CATEGORIES.filter((c) => c.key !== "all").map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <select
                      style={{
                        fontSize: "13px",
                        border: `1px solid ${BORDER}`,
                        borderRadius: "6px",
                        padding: "3px",
                      }}
                      value={app.column}
                      onChange={(e) =>
                        handleColumnChange(app.id, e.target.value)
                      }
                    >
                      {COLUMNS.map((c) => (
                        <option key={c.key} value={c.key}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <input
                      style={{ ...fieldStyle, width: "70px" }}
                      value={app.lastUpdated}
                      onChange={(e) =>
                        handleFieldChange(app.id, "lastUpdated", e.target.value)
                      }
                    />
                  </td>
                  <td style={{ padding: "10px 16px" }}>
                    <button
                      style={{
                        border: "none",
                        background: "transparent",
                        color: "#EF4444",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                      onClick={() => handleRemoveApplication(app.id)}
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ApplicationsBoard;
