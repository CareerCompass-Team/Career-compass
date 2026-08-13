import { useState } from "react";

import GeneralCvSection from "./GeneralCvSection";
import FrontEndCvSection from "./FrontEndCvSection";
import BackEndCvSection from "./BackEndCvSection";
import FullStackCvSection from "./FullStackCvSection";

// ---------- Shared colors (matching the CareerCompass screenshot) ----------
const PAGE_BG = "#F6F5FB";
const PURPLE = "#6D28D9";
const PURPLE_LIGHT = "#EDE9FE";
const TEXT_DARK = "#111827";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";
const CARD_BG = "#FFFFFF";

// The four CV divisions. Each one holds the three templates built earlier
// in its own section component.
const DIVISIONS = [
  {
    key: "general",
    name: "General CV",
    target: "Software Engineering",
    templateCount: 3,
    Component: GeneralCvSection,
  },
  {
    key: "frontend",
    name: "Front-End CV",
    target: "Frontend Development",
    templateCount: 3,
    Component: FrontEndCvSection,
  },
  {
    key: "backend",
    name: "Back-End CV",
    target: "Backend Development",
    templateCount: 3,
    Component: BackEndCvSection,
  },
  {
    key: "fullstack",
    name: "Full Stack CV",
    target: "Full Stack Development",
    templateCount: 3,
    Component: FullStackCvSection,
  },
];

function CVCenter(props) {
  const { initialDefaultDivision } = props;

  const [defaultDivision, setDefaultDivision] = useState(
    initialDefaultDivision || "general",
  );
  const [activeDivision, setActiveDivision] = useState(null);

  const handleSetDefault = (key) => {
    setDefaultDivision(key);
  };

  // Opens a division so its three templates (built in the imported
  // section component) are shown. There's no separate PDF file yet, so
  // "Edit CV" just opens the live templates directly.
  const handleOpenDivision = (key) => {
    setActiveDivision(key);
  };

  const handleCloseDivision = () => {
    setActiveDivision(null);
  };

  // Placeholder for uploading an existing CV file instead of using one of
  // the built-in templates. Wire this to actual file storage later.
  const handleUploadCv = () => {
    // TODO: open a file picker and store the uploaded CV
  };

  if (activeDivision) {
    const division = DIVISIONS.find((d) => d.key === activeDivision);
    const ActiveComponent = division.Component;

    return (
      <div
        style={{
          backgroundColor: PAGE_BG,
          minHeight: "100%",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ padding: "32px 32px 0" }}>
          <button
            style={{
              border: `1px solid ${BORDER}`,
              backgroundColor: "white",
              color: TEXT_MUTED,
              fontSize: "13px",
              padding: "8px 14px",
              borderRadius: "8px",
              cursor: "pointer",
              marginBottom: "16px",
            }}
            onClick={handleCloseDivision}
          >
            ← Back to CV Center
          </button>
        </div>
        <ActiveComponent />
      </div>
    );
  }

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
          marginBottom: "24px",
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
            CV Center
          </h1>
          <p style={{ color: TEXT_MUTED, marginTop: "4px" }}>
            {DIVISIONS.length} CVs ·{" "}
            {DIVISIONS.find((d) => d.key === defaultDivision)?.name} is your
            default
          </p>
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
          onClick={handleUploadCv}
        >
          + Upload CV
        </button>
      </div>

      {/* Division cards */}
      {DIVISIONS.map((division) => {
        const isDefault = division.key === defaultDivision;
        return (
          <div
            key={division.key}
            style={{
              backgroundColor: CARD_BG,
              border: `1px solid ${isDefault ? PURPLE : BORDER}`,
              borderRadius: "10px",
              padding: "20px 24px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  backgroundColor: PURPLE_LIGHT,
                  color: PURPLE,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              >
                CV
              </div>

              <div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: TEXT_DARK,
                    }}
                  >
                    {division.name}
                  </span>
                  {isDefault && (
                    <span
                      style={{
                        backgroundColor: PURPLE_LIGHT,
                        color: PURPLE,
                        fontSize: "12px",
                        padding: "2px 8px",
                        borderRadius: "999px",
                      }}
                    >
                      ⭐ Default
                    </span>
                  )}
                </div>
                <div
                  style={{
                    color: TEXT_MUTED,
                    fontSize: "13px",
                    marginTop: "2px",
                  }}
                >
                  Target: {division.target}
                </div>
                <div style={{ color: TEXT_MUTED, fontSize: "13px" }}>
                  {division.templateCount} templates available
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={{
                  border: `1px solid ${BORDER}`,
                  backgroundColor: "white",
                  color: TEXT_DARK,
                  fontSize: "13px",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() => handleOpenDivision(division.key)}
              >
                Edit CV
              </button>
              {!isDefault && (
                <button
                  style={{
                    border: `1px solid ${PURPLE}`,
                    backgroundColor: PURPLE_LIGHT,
                    color: PURPLE,
                    fontSize: "13px",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleSetDefault(division.key)}
                >
                  Set Default
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CVCenter;
