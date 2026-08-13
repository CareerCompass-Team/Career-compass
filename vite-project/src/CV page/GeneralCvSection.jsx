import { useState } from "react";

// Reference screenshots — drop the three template images into your assets
// folder with these names (or update the paths to match your project).
import sageTemplateImg from "../assets/Screenshot 2026-08-11 at 17.31.30.png";
import maroonTemplateImg from "../assets/Screenshot 2026-08-11 at 17.30.58.png";
import blueTemplateImg from "../assets/Screenshot 2026-08-11 at 17.31.15.png";

// ---------- Shared colors ----------
const SAGE = "#82A88A";
const SAGE_LIGHT = "#A9C4AC";
const SAGE_TEXT = "#E6EFE8";
const MAROON = "#A2453B";
const MAROON_BG = "#FBF3F2";
const BLUE = "#4A76A8";
const BLUE_BG = "#F5F7FA";
const TEXT_DARK = "#1F2937";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";

let idCounter = 100;
const nextId = () => `item-${idCounter++}`;

// ---------- Shared generic state helpers (used by both templates below) ----------
function updateField(setState, field, value) {
  setState((prev) => ({ ...prev, [field]: value }));
}

function updateListItem(list, setList, index, value) {
  const updated = [...list];
  updated[index] = value;
  setList(updated);
}

function addListItem(list, setList, item) {
  setList([...list, item]);
}

function removeListItem(list, setList, index) {
  setList(list.filter((_, i) => i !== index));
}

function updateBlockField(list, setList, id, field, value) {
  setList(
    list.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
  );
}

function updateBullet(list, setList, id, bulletIndex, value) {
  setList(
    list.map((item) => {
      if (item.id !== id) return item;
      const bullets = [...item.bullets];
      bullets[bulletIndex] = value;
      return { ...item, bullets };
    }),
  );
}

function addBullet(list, setList, id) {
  setList(
    list.map((item) =>
      item.id === id
        ? { ...item, bullets: [...item.bullets, "New bullet point"] }
        : item,
    ),
  );
}

function removeBullet(list, setList, id, bulletIndex) {
  setList(
    list.map((item) =>
      item.id === id
        ? { ...item, bullets: item.bullets.filter((_, i) => i !== bulletIndex) }
        : item,
    ),
  );
}

const removeBtnStyle = {
  border: "none",
  background: "transparent",
  color: "#EF4444",
  cursor: "pointer",
  fontSize: "12px",
  marginLeft: "6px",
};

const addBtnStyle = (accent) => ({
  border: `1px dashed ${BORDER}`,
  background: "white",
  color: TEXT_MUTED,
  cursor: "pointer",
  fontSize: "13px",
  padding: "6px 12px",
  borderRadius: "6px",
  marginTop: "8px",
});

/*
   TEMPLATE 1 - Sage green sidebar style
  */
function GeneralCvSage(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Nick Sanchez",
      email: "n.sanchez@example.com",
      phone: "(111) 234-5678",
      address: "Boulder, CO",
    },
  );

  const [hardSkills, setHardSkills] = useState(
    initialData?.hardSkills || [
      "Java, JavaScript, No SQL, and SQL Server",
      "Agile frameworks",
      "Status tracking frameworks",
      "Software and application testing",
    ],
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Meticulous software engineer with 4+ years of experience. Fluent in Java, JavaScript, No SQL, and SQL Server and have worked on 3+ major application projects each year. Seeking to leverage experience with multiple types of software and application development to join the DevTech team as a Software Engineer.",
  );

  const [workExperience, setWorkExperience] = useState(
    initialData?.workExperience || [
      {
        id: nextId(),
        title: "Software Engineer",
        company: "Front Range Tech Solutions, Boulder, CO",
        startDate: "Apr 2018",
        endDate: "Present",
        bullets: [
          "Engineered 3+ major applications per year using Java, JavaScript, No SQL, and SQL Server",
          "Worked closely with product managers to create project requirements and define application features",
          "Created workflows that helped eliminate downtime, reducing production time by 35%",
        ],
      },
      {
        id: nextId(),
        title: "Software Engineer Intern",
        company: "TPY Tech, Boulder, CO",
        startDate: "May 2017",
        endDate: "Apr 2018",
        bullets: [
          "Shadowed experienced engineer for first 3 months to learn all engineering and testing processes",
          "Checked all completed software and applications against client requirements",
          "Worked with product team to plan and set timelines for future projects",
        ],
      },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Bachelor's Degree in Computer Science",
        school: "University of Colorado Boulder, Boulder, CO",
        startDate: "2013",
        endDate: "2017",
        bullets: [
          "Courses focused heavily on full stack engineering",
          "Built an iPhone ecommerce app for senior thesis project",
        ],
      },
    ],
  );

  const [softSkills, setSoftSkills] = useState(
    initialData?.softSkills || [
      "Teamwork",
      "Adaptability",
      "Communication",
      "Organization",
    ],
  );

  const [certifications, setCertifications] = useState(
    initialData?.certifications || [
      { id: nextId(), date: "Nov 2019", name: "Certified Scrum Master" },
      {
        id: nextId(),
        date: "Jan 2019",
        name: "Agile Project Estimations Course",
      },
      {
        id: nextId(),
        date: "Sep 2017",
        name: "Certified Web and Mobile Developer",
      },
    ],
  );

  const handleSave = () => {
    if (onSave) {
      onSave({
        personal,
        hardSkills,
        summary,
        workExperience,
        education,
        softSkills,
        certifications,
      });
    }
  };

  const fieldStyleLight = {
    border: "none",
    borderBottom: "1px dashed rgba(255,255,255,0.4)",
    background: "transparent",
    color: "white",
    fontSize: "14px",
    padding: "2px 0",
    outline: "none",
    width: "100%",
  };

  const fieldStyle = {
    border: "none",
    borderBottom: `1px dashed ${BORDER}`,
    background: "transparent",
    color: TEXT_DARK,
    fontSize: "14px",
    padding: "2px 0",
    outline: "none",
    width: "100%",
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left sidebar */}
      <div style={{ width: "260px", backgroundColor: SAGE }}>
        <div style={{ height: "40px", backgroundColor: SAGE_LIGHT }} />
        <div style={{ padding: "24px" }}>
          <h2
            style={{ color: SAGE_TEXT, fontSize: "20px", marginBottom: "4px" }}
          >
            Personal details
          </h2>
          <div
            style={{
              borderBottom: `1px solid ${SAGE_TEXT}`,
              marginBottom: "16px",
            }}
          />

          {[
            { field: "name", label: "Name" },
            { field: "email", label: "Email address" },
            { field: "phone", label: "Phone number" },
            { field: "address", label: "Address" },
          ].map(({ field, label }) => (
            <div key={field} style={{ marginBottom: "12px" }}>
              <div
                style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}
              >
                {label}
              </div>
              <input
                style={fieldStyleLight}
                value={personal[field]}
                onChange={(e) =>
                  updateField(setPersonal, field, e.target.value)
                }
              />
            </div>
          ))}

          <h2
            style={{
              color: SAGE_TEXT,
              fontSize: "20px",
              marginTop: "24px",
              marginBottom: "4px",
            }}
          >
            Hard Skills
          </h2>
          <div
            style={{
              borderBottom: `1px solid ${SAGE_TEXT}`,
              marginBottom: "16px",
            }}
          />
          {hardSkills.map((skill, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <input
                style={fieldStyleLight}
                value={skill}
                onChange={(e) =>
                  updateListItem(
                    hardSkills,
                    setHardSkills,
                    index,
                    e.target.value,
                  )
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() => removeListItem(hardSkills, setHardSkills, index)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            style={{
              ...addBtnStyle(),
              backgroundColor: "transparent",
              color: "white",
            }}
            onClick={() => addListItem(hardSkills, setHardSkills, "New skill")}
          >
            + Add skill
          </button>
        </div>
      </div>

      {/* Right main column */}
      <div style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}>
        <input
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            width: "100%",
            marginBottom: "16px",
            color: TEXT_DARK,
          }}
          value={personal.name}
          onChange={(e) => updateField(setPersonal, "name", e.target.value)}
        />

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: TEXT_DARK }}>Summary</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          <textarea
            style={{ ...fieldStyle, borderBottom: "none", resize: "vertical" }}
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: TEXT_DARK }}>
            Work Experience
          </h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {workExperience.map((job) => (
            <div key={job.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{
                    ...fieldStyle,
                    fontWeight: "bold",
                    fontSize: "15px",
                    width: "60%",
                  }}
                  value={job.title}
                  onChange={(e) =>
                    updateBlockField(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "title",
                      e.target.value,
                    )
                  }
                />
                <div style={{ display: "flex" }}>
                  <input
                    style={{ ...fieldStyle, width: "70px" }}
                    value={job.startDate}
                    onChange={(e) =>
                      updateBlockField(
                        workExperience,
                        setWorkExperience,
                        job.id,
                        "startDate",
                        e.target.value,
                      )
                    }
                  />
                  {" - "}
                  <input
                    style={{ ...fieldStyle, width: "70px" }}
                    value={job.endDate}
                    onChange={(e) =>
                      updateBlockField(
                        workExperience,
                        setWorkExperience,
                        job.id,
                        "endDate",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
              <input
                style={{ ...fieldStyle, color: SAGE, fontWeight: "bold" }}
                value={job.company}
                onChange={(e) =>
                  updateBlockField(
                    workExperience,
                    setWorkExperience,
                    job.id,
                    "company",
                    e.target.value,
                  )
                }
              />
              <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
                {job.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      style={{ ...fieldStyle, flex: 1 }}
                      value={bullet}
                      onChange={(e) =>
                        updateBullet(
                          workExperience,
                          setWorkExperience,
                          job.id,
                          bulletIndex,
                          e.target.value,
                        )
                      }
                    />
                    <button
                      style={removeBtnStyle}
                      onClick={() =>
                        removeBullet(
                          workExperience,
                          setWorkExperience,
                          job.id,
                          bulletIndex,
                        )
                      }
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <button
                style={addBtnStyle()}
                onClick={() =>
                  addBullet(workExperience, setWorkExperience, job.id)
                }
              >
                + Add bullet
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle()}
            onClick={() =>
              setWorkExperience([
                ...workExperience,
                {
                  id: nextId(),
                  title: "Job Title",
                  company: "Company, Location",
                  startDate: "Mon Year",
                  endDate: "Present",
                  bullets: ["New bullet point"],
                },
              ])
            }
          >
            + Add work experience
          </button>
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: TEXT_DARK }}>Education</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{
                    ...fieldStyle,
                    fontWeight: "bold",
                    fontSize: "15px",
                    width: "60%",
                  }}
                  value={edu.degree}
                  onChange={(e) =>
                    updateBlockField(
                      education,
                      setEducation,
                      edu.id,
                      "degree",
                      e.target.value,
                    )
                  }
                />
                <div style={{ display: "flex" }}>
                  <input
                    style={{ ...fieldStyle, width: "50px" }}
                    value={edu.startDate}
                    onChange={(e) =>
                      updateBlockField(
                        education,
                        setEducation,
                        edu.id,
                        "startDate",
                        e.target.value,
                      )
                    }
                  />
                  {" - "}
                  <input
                    style={{ ...fieldStyle, width: "50px" }}
                    value={edu.endDate}
                    onChange={(e) =>
                      updateBlockField(
                        education,
                        setEducation,
                        edu.id,
                        "endDate",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
              <input
                style={{ ...fieldStyle, color: SAGE, fontWeight: "bold" }}
                value={edu.school}
                onChange={(e) =>
                  updateBlockField(
                    education,
                    setEducation,
                    edu.id,
                    "school",
                    e.target.value,
                  )
                }
              />
              <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
                {edu.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      style={{ ...fieldStyle, flex: 1 }}
                      value={bullet}
                      onChange={(e) =>
                        updateBullet(
                          education,
                          setEducation,
                          edu.id,
                          bulletIndex,
                          e.target.value,
                        )
                      }
                    />
                    <button
                      style={removeBtnStyle}
                      onClick={() =>
                        removeBullet(
                          education,
                          setEducation,
                          edu.id,
                          bulletIndex,
                        )
                      }
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: TEXT_DARK }}>Soft Skills</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {softSkills.map((skill, index) => (
              <input
                key={index}
                style={{ ...fieldStyle, width: "45%", fontWeight: "bold" }}
                value={skill}
                onChange={(e) =>
                  updateListItem(
                    softSkills,
                    setSoftSkills,
                    index,
                    e.target.value,
                  )
                }
              />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "22px", color: TEXT_DARK }}>Certifications</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {certifications.map((cert) => (
            <div
              key={cert.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <input
                style={{ ...fieldStyle, fontWeight: "bold", width: "60%" }}
                value={cert.name}
                onChange={(e) =>
                  updateBlockField(
                    certifications,
                    setCertifications,
                    cert.id,
                    "name",
                    e.target.value,
                  )
                }
              />
              <input
                style={{ ...fieldStyle, fontWeight: "bold", width: "100px" }}
                value={cert.date}
                onChange={(e) =>
                  updateBlockField(
                    certifications,
                    setCertifications,
                    cert.id,
                    "date",
                    e.target.value,
                  )
                }
              />
            </div>
          ))}
        </section>

        <button
          style={{
            backgroundColor: SAGE,
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={handleSave}
        >
          Save CV
        </button>
      </div>
    </div>
  );
}

/*
   TEMPLATE 2 - Maroon accent style
   */
function GeneralCvMaroon(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Nick Sanchez",
      email: "n.sanchez@example.com",
      phone: "(111) 234-5678",
      address: "Boulder, CO",
    },
  );

  const [hardSkills, setHardSkills] = useState(
    initialData?.hardSkills || [
      "Java, JavaScript, No SQL, and SQL Server",
      "Agile frameworks",
      "Status tracking frameworks",
      "Software and application testing",
    ],
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Meticulous software engineer with 4+ years of experience. Fluent in Java, JavaScript, No SQL, and SQL Server and have worked on 3+ major application projects each year.",
  );

  const [workExperience, setWorkExperience] = useState(
    initialData?.workExperience || [
      {
        id: nextId(),
        title: "Software Engineer",
        company: "Front Range Tech Solutions, Boulder, CO",
        startDate: "Apr 2018",
        endDate: "Present",
        bullets: [
          "Engineered 3+ major applications per year using Java, JavaScript, No SQL, and SQL Server",
          "Worked closely with product managers to create project requirements",
        ],
      },
      {
        id: nextId(),
        title: "Software Engineer Intern",
        company: "TPY Tech, Boulder, CO",
        startDate: "May 2017",
        endDate: "Apr 2018",
        bullets: [
          "Shadowed experienced engineers to learn engineering and testing processes",
        ],
      },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Bachelor's Degree in Computer Science",
        school: "University of Colorado Boulder, Boulder, CO",
        startDate: "2013",
        endDate: "2017",
        bullets: ["Courses focused heavily on full stack engineering"],
      },
    ],
  );

  const [softSkills, setSoftSkills] = useState(
    initialData?.softSkills || [
      "Teamwork",
      "Adaptability",
      "Communication",
      "Organization",
    ],
  );

  const [certifications, setCertifications] = useState(
    initialData?.certifications || [
      { id: nextId(), date: "Nov 2019", name: "Certified Scrum Master" },
      {
        id: nextId(),
        date: "Jan 2019",
        name: "Agile Project Estimations Course",
      },
    ],
  );

  const handleSave = () => {
    if (onSave) {
      onSave({
        personal,
        hardSkills,
        summary,
        workExperience,
        education,
        softSkills,
        certifications,
      });
    }
  };

  const fieldStyle = {
    border: "none",
    borderBottom: `1px dashed ${BORDER}`,
    background: "transparent",
    color: TEXT_DARK,
    fontSize: "14px",
    padding: "2px 0",
    outline: "none",
    width: "100%",
  };

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        borderLeft: `10px solid ${MAROON}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left column */}
      <div
        style={{ width: "260px", backgroundColor: MAROON_BG, padding: "24px" }}
      >
        <h2 style={{ color: MAROON, fontSize: "20px", marginBottom: "4px" }}>
          Personal details
        </h2>
        <div
          style={{ borderBottom: `1px solid ${BORDER}`, marginBottom: "16px" }}
        />

        {["name", "email", "phone", "address"].map((field) => (
          <div
            key={field}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <span style={{ marginRight: "8px" }}>
              {field === "name" && "👤"}
              {field === "email" && "✉️"}
              {field === "phone" && "📞"}
              {field === "address" && "🏠"}
            </span>
            <input
              style={fieldStyle}
              value={personal[field]}
              onChange={(e) => updateField(setPersonal, field, e.target.value)}
            />
          </div>
        ))}

        <h2
          style={{
            color: MAROON,
            fontSize: "20px",
            marginTop: "24px",
            marginBottom: "4px",
          }}
        >
          Hard Skills
        </h2>
        <div
          style={{ borderBottom: `1px solid ${BORDER}`, marginBottom: "16px" }}
        />
        {hardSkills.map((skill, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              style={fieldStyle}
              value={skill}
              onChange={(e) =>
                updateListItem(hardSkills, setHardSkills, index, e.target.value)
              }
            />
            <button
              style={removeBtnStyle}
              onClick={() => removeListItem(hardSkills, setHardSkills, index)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          style={addBtnStyle()}
          onClick={() => addListItem(hardSkills, setHardSkills, "New skill")}
        >
          + Add skill
        </button>
      </div>

      {/* Right column */}
      <div style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}>
        <input
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            width: "100%",
            marginBottom: "16px",
            color: MAROON,
          }}
          value={personal.name}
          onChange={(e) => updateField(setPersonal, "name", e.target.value)}
        />

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: MAROON }}>Summary</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          <textarea
            style={{ ...fieldStyle, borderBottom: "none", resize: "vertical" }}
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: MAROON }}>Work Experience</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {workExperience.map((job) => (
            <div key={job.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{
                    ...fieldStyle,
                    fontWeight: "bold",
                    fontSize: "15px",
                    width: "60%",
                  }}
                  value={job.title}
                  onChange={(e) =>
                    updateBlockField(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "title",
                      e.target.value,
                    )
                  }
                />
                <div
                  style={{ display: "flex", color: MAROON, fontWeight: "bold" }}
                >
                  <input
                    style={{
                      ...fieldStyle,
                      width: "70px",
                      color: MAROON,
                      fontWeight: "bold",
                    }}
                    value={job.startDate}
                    onChange={(e) =>
                      updateBlockField(
                        workExperience,
                        setWorkExperience,
                        job.id,
                        "startDate",
                        e.target.value,
                      )
                    }
                  />
                  {" - "}
                  <input
                    style={{
                      ...fieldStyle,
                      width: "70px",
                      color: MAROON,
                      fontWeight: "bold",
                    }}
                    value={job.endDate}
                    onChange={(e) =>
                      updateBlockField(
                        workExperience,
                        setWorkExperience,
                        job.id,
                        "endDate",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
              <input
                style={{ ...fieldStyle, color: MAROON, fontWeight: "bold" }}
                value={job.company}
                onChange={(e) =>
                  updateBlockField(
                    workExperience,
                    setWorkExperience,
                    job.id,
                    "company",
                    e.target.value,
                  )
                }
              />
              <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
                {job.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      style={{ ...fieldStyle, flex: 1 }}
                      value={bullet}
                      onChange={(e) =>
                        updateBullet(
                          workExperience,
                          setWorkExperience,
                          job.id,
                          bulletIndex,
                          e.target.value,
                        )
                      }
                    />
                    <button
                      style={removeBtnStyle}
                      onClick={() =>
                        removeBullet(
                          workExperience,
                          setWorkExperience,
                          job.id,
                          bulletIndex,
                        )
                      }
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
              <button
                style={addBtnStyle()}
                onClick={() =>
                  addBullet(workExperience, setWorkExperience, job.id)
                }
              >
                + Add bullet
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle()}
            onClick={() =>
              setWorkExperience([
                ...workExperience,
                {
                  id: nextId(),
                  title: "Job Title",
                  company: "Company, Location",
                  startDate: "Mon Year",
                  endDate: "Present",
                  bullets: ["New bullet point"],
                },
              ])
            }
          >
            + Add work experience
          </button>
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: MAROON }}>Education</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{
                    ...fieldStyle,
                    fontWeight: "bold",
                    fontSize: "15px",
                    width: "60%",
                  }}
                  value={edu.degree}
                  onChange={(e) =>
                    updateBlockField(
                      education,
                      setEducation,
                      edu.id,
                      "degree",
                      e.target.value,
                    )
                  }
                />
                <div
                  style={{ display: "flex", color: MAROON, fontWeight: "bold" }}
                >
                  <input
                    style={{
                      ...fieldStyle,
                      width: "50px",
                      color: MAROON,
                      fontWeight: "bold",
                    }}
                    value={edu.startDate}
                    onChange={(e) =>
                      updateBlockField(
                        education,
                        setEducation,
                        edu.id,
                        "startDate",
                        e.target.value,
                      )
                    }
                  />
                  {" - "}
                  <input
                    style={{
                      ...fieldStyle,
                      width: "50px",
                      color: MAROON,
                      fontWeight: "bold",
                    }}
                    value={edu.endDate}
                    onChange={(e) =>
                      updateBlockField(
                        education,
                        setEducation,
                        edu.id,
                        "endDate",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
              <input
                style={{ ...fieldStyle, color: MAROON, fontWeight: "bold" }}
                value={edu.school}
                onChange={(e) =>
                  updateBlockField(
                    education,
                    setEducation,
                    edu.id,
                    "school",
                    e.target.value,
                  )
                }
              />
              <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
                {edu.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      style={{ ...fieldStyle, flex: 1 }}
                      value={bullet}
                      onChange={(e) =>
                        updateBullet(
                          education,
                          setEducation,
                          edu.id,
                          bulletIndex,
                          e.target.value,
                        )
                      }
                    />
                    <button
                      style={removeBtnStyle}
                      onClick={() =>
                        removeBullet(
                          education,
                          setEducation,
                          edu.id,
                          bulletIndex,
                        )
                      }
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: MAROON }}>Soft Skills</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {softSkills.map((skill, index) => (
              <input
                key={index}
                style={{ ...fieldStyle, width: "45%", fontWeight: "bold" }}
                value={skill}
                onChange={(e) =>
                  updateListItem(
                    softSkills,
                    setSoftSkills,
                    index,
                    e.target.value,
                  )
                }
              />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "22px", color: MAROON }}>Certifications</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {certifications.map((cert) => (
            <div
              key={cert.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <input
                style={{ ...fieldStyle, fontWeight: "bold", width: "60%" }}
                value={cert.name}
                onChange={(e) =>
                  updateBlockField(
                    certifications,
                    setCertifications,
                    cert.id,
                    "name",
                    e.target.value,
                  )
                }
              />
              <input
                style={{
                  ...fieldStyle,
                  color: MAROON,
                  fontWeight: "bold",
                  width: "100px",
                }}
                value={cert.date}
                onChange={(e) =>
                  updateBlockField(
                    certifications,
                    setCertifications,
                    cert.id,
                    "date",
                    e.target.value,
                  )
                }
              />
            </div>
          ))}
        </section>

        <button
          style={{
            backgroundColor: MAROON,
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={handleSave}
        >
          Save CV
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   TEMPLATE 3 — Blue banner style
   ============================================================ */
function GeneralCvBlue(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Nick Sanchez",
      email: "n.sanchez@example.com",
      phone: "(111) 234-5678",
      address: "Boulder, CO",
    },
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Meticulous software engineer with 4+ years of experience. Fluent in Java, JavaScript, No SQL, and SQL Server and have worked on 3+ major application projects each year.",
  );

  const [workExperience, setWorkExperience] = useState(
    initialData?.workExperience || [
      {
        id: nextId(),
        title: "Software Engineer",
        company: "Front Range Tech Solutions, Boulder, CO",
        startDate: "Apr 2018",
        endDate: "Present",
        bullets: [
          "Engineered 3+ major applications per year using Java, JavaScript, No SQL, and SQL Server",
        ],
      },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Bachelor's Degree in Computer Science",
        school: "University of Colorado Boulder, Boulder, CO",
        startDate: "2013",
        endDate: "2017",
        bullets: ["Courses focused heavily on full stack engineering"],
      },
    ],
  );

  const [hardSkills, setHardSkills] = useState(
    initialData?.hardSkills || [
      "Java, JavaScript, No SQL, and SQL Server",
      "Agile frameworks",
      "Status tracking frameworks",
      "Software and application testing",
    ],
  );

  // Kept in state (not rendered in this layout) so the schema stays
  // consistent with GeneralCvMaroon for the autofill feature.
  const [softSkills, setSoftSkills] = useState(initialData?.softSkills || []);
  const [certifications, setCertifications] = useState(
    initialData?.certifications || [],
  );

  const handleSave = () => {
    if (onSave) {
      onSave({
        personal,
        hardSkills,
        summary,
        workExperience,
        education,
        softSkills,
        certifications,
      });
    }
  };

  const fieldStyle = {
    border: "none",
    borderBottom: `1px dashed ${BORDER}`,
    background: "transparent",
    color: TEXT_DARK,
    fontSize: "14px",
    padding: "2px 0",
    outline: "none",
    width: "100%",
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ height: "16px", backgroundColor: BLUE }} />

      <div style={{ padding: "24px 32px 0" }}>
        <input
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            width: "100%",
            color: BLUE,
          }}
          value={personal.name}
          onChange={(e) => updateField(setPersonal, "name", e.target.value)}
        />
      </div>

      <div style={{ display: "flex" }}>
        {/* Left sidebar */}
        <div
          style={{ width: "260px", backgroundColor: BLUE_BG, padding: "24px" }}
        >
          <h2 style={{ color: BLUE, fontSize: "20px", marginBottom: "4px" }}>
            Personal details
          </h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "16px",
            }}
          />

          {[
            { field: "name", label: "Name" },
            { field: "email", label: "Email address" },
            { field: "phone", label: "Phone number" },
            { field: "address", label: "Address" },
          ].map(({ field, label }) => (
            <div key={field} style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "13px",
                  color: TEXT_DARK,
                }}
              >
                {label}
              </div>
              <input
                style={fieldStyle}
                value={personal[field]}
                onChange={(e) =>
                  updateField(setPersonal, field, e.target.value)
                }
              />
            </div>
          ))}
        </div>

        {/* Right main column */}
        <div
          style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}
        >
          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", color: BLUE }}>Summary</h2>
            <div
              style={{
                borderBottom: `1px solid ${BORDER}`,
                marginBottom: "10px",
              }}
            />
            <textarea
              style={{
                ...fieldStyle,
                borderBottom: "none",
                resize: "vertical",
              }}
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </section>

          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", color: BLUE }}>Work Experience</h2>
            <div
              style={{
                borderBottom: `1px solid ${BORDER}`,
                marginBottom: "10px",
              }}
            />
            {workExperience.map((job) => (
              <div key={job.id} style={{ marginBottom: "16px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    style={{
                      ...fieldStyle,
                      fontWeight: "bold",
                      fontSize: "15px",
                      width: "60%",
                    }}
                    value={job.title}
                    onChange={(e) =>
                      updateBlockField(
                        workExperience,
                        setWorkExperience,
                        job.id,
                        "title",
                        e.target.value,
                      )
                    }
                  />
                  <div
                    style={{ display: "flex", color: BLUE, fontWeight: "bold" }}
                  >
                    <input
                      style={{
                        ...fieldStyle,
                        width: "70px",
                        color: BLUE,
                        fontWeight: "bold",
                      }}
                      value={job.startDate}
                      onChange={(e) =>
                        updateBlockField(
                          workExperience,
                          setWorkExperience,
                          job.id,
                          "startDate",
                          e.target.value,
                        )
                      }
                    />
                    {" - "}
                    <input
                      style={{
                        ...fieldStyle,
                        width: "70px",
                        color: BLUE,
                        fontWeight: "bold",
                      }}
                      value={job.endDate}
                      onChange={(e) =>
                        updateBlockField(
                          workExperience,
                          setWorkExperience,
                          job.id,
                          "endDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <input
                  style={{ ...fieldStyle, color: BLUE, fontWeight: "bold" }}
                  value={job.company}
                  onChange={(e) =>
                    updateBlockField(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "company",
                      e.target.value,
                    )
                  }
                />
                <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
                  {job.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        style={{ ...fieldStyle, flex: 1 }}
                        value={bullet}
                        onChange={(e) =>
                          updateBullet(
                            workExperience,
                            setWorkExperience,
                            job.id,
                            bulletIndex,
                            e.target.value,
                          )
                        }
                      />
                      <button
                        style={removeBtnStyle}
                        onClick={() =>
                          removeBullet(
                            workExperience,
                            setWorkExperience,
                            job.id,
                            bulletIndex,
                          )
                        }
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  style={addBtnStyle()}
                  onClick={() =>
                    addBullet(workExperience, setWorkExperience, job.id)
                  }
                >
                  + Add bullet
                </button>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "22px", color: BLUE }}>Education</h2>
            <div
              style={{
                borderBottom: `1px solid ${BORDER}`,
                marginBottom: "10px",
              }}
            />
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "16px" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    style={{
                      ...fieldStyle,
                      fontWeight: "bold",
                      fontSize: "15px",
                      width: "60%",
                    }}
                    value={edu.degree}
                    onChange={(e) =>
                      updateBlockField(
                        education,
                        setEducation,
                        edu.id,
                        "degree",
                        e.target.value,
                      )
                    }
                  />
                  <div
                    style={{ display: "flex", color: BLUE, fontWeight: "bold" }}
                  >
                    <input
                      style={{
                        ...fieldStyle,
                        width: "50px",
                        color: BLUE,
                        fontWeight: "bold",
                      }}
                      value={edu.startDate}
                      onChange={(e) =>
                        updateBlockField(
                          education,
                          setEducation,
                          edu.id,
                          "startDate",
                          e.target.value,
                        )
                      }
                    />
                    {" - "}
                    <input
                      style={{
                        ...fieldStyle,
                        width: "50px",
                        color: BLUE,
                        fontWeight: "bold",
                      }}
                      value={edu.endDate}
                      onChange={(e) =>
                        updateBlockField(
                          education,
                          setEducation,
                          edu.id,
                          "endDate",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>
                <input
                  style={{ ...fieldStyle, color: BLUE, fontWeight: "bold" }}
                  value={edu.school}
                  onChange={(e) =>
                    updateBlockField(
                      education,
                      setEducation,
                      edu.id,
                      "school",
                      e.target.value,
                    )
                  }
                />
                <ul style={{ paddingLeft: "18px", margin: "8px 0" }}>
                  {edu.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        style={{ ...fieldStyle, flex: 1 }}
                        value={bullet}
                        onChange={(e) =>
                          updateBullet(
                            education,
                            setEducation,
                            edu.id,
                            bulletIndex,
                            e.target.value,
                          )
                        }
                      />
                      <button
                        style={removeBtnStyle}
                        onClick={() =>
                          removeBullet(
                            education,
                            setEducation,
                            edu.id,
                            bulletIndex,
                          )
                        }
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section style={{ marginBottom: "16px" }}>
            <h2 style={{ fontSize: "22px", color: BLUE }}>Hard Skills</h2>
            <div
              style={{
                borderBottom: `1px solid ${BORDER}`,
                marginBottom: "10px",
              }}
            />
            {hardSkills.map((skill, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  style={fieldStyle}
                  value={skill}
                  onChange={(e) =>
                    updateListItem(
                      hardSkills,
                      setHardSkills,
                      index,
                      e.target.value,
                    )
                  }
                />
                <button
                  style={removeBtnStyle}
                  onClick={() =>
                    removeListItem(hardSkills, setHardSkills, index)
                  }
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              style={addBtnStyle()}
              onClick={() =>
                addListItem(hardSkills, setHardSkills, "New skill")
              }
            >
              + Add skill
            </button>
          </section>

          <button
            style={{
              backgroundColor: BLUE,
              color: "white",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={handleSave}
          >
            Save CV
          </button>
        </div>
      </div>

      <div
        style={{ height: "16px", backgroundColor: BLUE, marginTop: "24px" }}
      />
    </div>
  );
}

/* ============================================================
   GENERAL CV DIVISION — shows all three templates next to
   their reference images
   ============================================================ */
function GeneralCvSection(props) {
  const templates = [
    {
      key: "sage",
      label: "Template 1 — Sage Green",
      image: sageTemplateImg,
      Component: GeneralCvSage,
    },
    {
      key: "maroon",
      label: "Template 2 — Maroon Accent",
      image: maroonTemplateImg,
      Component: GeneralCvMaroon,
    },
    {
      key: "blue",
      label: "Template 3 — Blue Banner",
      image: blueTemplateImg,
      Component: GeneralCvBlue,
    },
  ];

  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>General CV</h1>
      <p style={{ color: TEXT_MUTED, marginBottom: "32px" }}>
        Target role: Software Engineering — choose a template and fill in your
        details.
      </p>

      {templates.map(({ key, label, image, Component }) => (
        <div key={key} style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "12px" }}>{label}</h2>
          <div
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <img
              src={image}
              alt={`${label} reference`}
              style={{
                width: "260px",
                border: `1px solid ${BORDER}`,
                borderRadius: "6px",
              }}
            />
            <div style={{ flex: 1, minWidth: "320px" }}>
              <Component />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GeneralCvSection;
export { GeneralCvSage, GeneralCvMaroon, GeneralCvBlue };
