import { useState } from "react";

// Reference screenshots — save the three Backend CV example images into
// your assets folder with these names (or update the paths).
import geometricTemplateImg from "../assets/BackEndGreen.jpg";
import darkCreamTemplateImg from "../assets/BackEndGrey.png";
import purpleTemplateImg from "../assets/BackEndPurple.jpg";

// ---------- Shared colors ----------
const CHARCOAL = "#2E2E2E";
const TEAL = "#0F6B5C";
const NAVY = "#2B2E3B";
const CREAM = "#F3E8DE";
const PURPLE = "#4B4A9E";
const TEXT_DARK = "#1F2937";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";

let idCounter = 300;
const nextId = () => `item-${idCounter++}`;

// ---------- Shared generic state helpers ----------
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

function addBlockItem(list, setList, item) {
  setList([...list, item]);
}

function removeBlockItem(list, setList, id) {
  setList(list.filter((item) => item.id !== id));
}

const removeBtnStyle = {
  border: "none",
  background: "transparent",
  color: "#EF4444",
  cursor: "pointer",
  fontSize: "12px",
  marginLeft: "6px",
};

const addBtnStyle = {
  border: `1px dashed ${BORDER}`,
  background: "white",
  color: TEXT_MUTED,
  cursor: "pointer",
  fontSize: "13px",
  padding: "6px 12px",
  borderRadius: "6px",
  marginTop: "8px",
};

/* ============================================================
   TEMPLATE 1 — Charcoal sidebar, teal geometric accent (Image 1)
   ============================================================ */
function BackEndCvGeometric(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Shushrut Yadav",
      title: "Backend Developer",
      address: "New Delhi, India",
      phone: "8027280990",
      email: "shushrutyadav@gmail.com",
      linkedin: "linkedin.com/in/shushrut-yadav",
    },
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      { id: nextId(), name: "Object-Oriented Web Applications", level: 90 },
      { id: nextId(), name: "Web Development", level: 85 },
      { id: nextId(), name: "JavaScript", level: 80 },
      { id: nextId(), name: "SQL", level: 75 },
      { id: nextId(), name: "Python / Java", level: 80 },
    ],
  );

  const [courses, setCourses] = useState(
    initialData?.courses || [
      {
        id: nextId(),
        name: "Advanced Backend Web Development",
        provider: "Udemy",
        year: "2021",
      },
    ],
  );

  const [languages, setLanguages] = useState(
    initialData?.languages || [
      { id: nextId(), name: "Hindi", level: 95 },
      { id: nextId(), name: "English", level: 85 },
    ],
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Experienced Backend Developer with strong knowledge of Agile Software Development practices, REST API, Springboot, Terraform, and Kubernetes.",
  );

  const [employmentHistory, setEmploymentHistory] = useState(
    initialData?.employmentHistory || [
      {
        id: nextId(),
        role: "Backend Developer",
        dates: "Jan 2020 - Present",
        company: "Tata Consultancy Services, New Delhi",
        bullets: [
          "Use frameworks to build service-side software and integrate APIs and cloud computing.",
        ],
      },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "B.Tech Computer Science",
        year: "2018",
        school: "Delhi Technical University, New Delhi",
      },
    ],
  );

  const handleSave = () => {
    if (onSave)
      onSave({
        personal,
        skills,
        courses,
        languages,
        summary,
        employmentHistory,
        education,
      });
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

  const sidebarFieldStyle = {
    ...fieldStyle,
    color: "white",
    borderBottom: "1px dashed rgba(255,255,255,0.3)",
  };

  const barStyle = {
    height: "5px",
    borderRadius: "3px",
    backgroundColor: "rgba(255,255,255,0.2)",
    width: "100%",
    marginTop: "4px",
  };
  const barFillStyle = (level) => ({
    height: "5px",
    borderRadius: "3px",
    backgroundColor: "white",
    width: `${level}%`,
  });

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
      <div
        style={{
          width: "260px",
          backgroundColor: CHARCOAL,
          padding: "24px",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "14px", letterSpacing: "1px" }}>
          PERSONAL INFO
        </h2>
        {[
          { field: "address", label: "Address" },
          { field: "phone", label: "Phone" },
          { field: "email", label: "Email" },
          { field: "linkedin", label: "LinkedIn" },
        ].map(({ field, label }) => (
          <div key={field} style={{ marginBottom: "10px" }}>
            <div style={{ fontWeight: "bold", fontSize: "12px" }}>{label}</div>
            <input
              style={sidebarFieldStyle}
              value={personal[field]}
              onChange={(e) => updateField(setPersonal, field, e.target.value)}
            />
          </div>
        ))}

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          SKILLS
        </h2>
        {skills.map((skill) => (
          <div key={skill.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ ...sidebarFieldStyle, fontSize: "12px" }}
                value={skill.name}
                onChange={(e) =>
                  updateBlockField(
                    skills,
                    setSkills,
                    skill.id,
                    "name",
                    e.target.value,
                  )
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() => removeBlockItem(skills, setSkills, skill.id)}
              >
                ✕
              </button>
            </div>
            <div style={barStyle}>
              <div style={barFillStyle(skill.level)} />
            </div>
          </div>
        ))}
        <button
          style={{
            ...addBtnStyle,
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() =>
            addBlockItem(skills, setSkills, {
              id: nextId(),
              name: "New skill",
              level: 50,
            })
          }
        >
          + Add skill
        </button>

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          COURSES
        </h2>
        {courses.map((course) => (
          <div key={course.id} style={{ marginBottom: "10px" }}>
            <input
              style={{ ...sidebarFieldStyle, fontWeight: "bold" }}
              value={course.name}
              onChange={(e) =>
                updateBlockField(
                  courses,
                  setCourses,
                  course.id,
                  "name",
                  e.target.value,
                )
              }
            />
            <input
              style={sidebarFieldStyle}
              value={course.provider}
              onChange={(e) =>
                updateBlockField(
                  courses,
                  setCourses,
                  course.id,
                  "provider",
                  e.target.value,
                )
              }
            />
            <input
              style={sidebarFieldStyle}
              value={course.year}
              onChange={(e) =>
                updateBlockField(
                  courses,
                  setCourses,
                  course.id,
                  "year",
                  e.target.value,
                )
              }
            />
            <button
              style={removeBtnStyle}
              onClick={() => removeBlockItem(courses, setCourses, course.id)}
            >
              ✕ remove
            </button>
          </div>
        ))}
        <button
          style={{
            ...addBtnStyle,
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() =>
            addBlockItem(courses, setCourses, {
              id: nextId(),
              name: "Course name",
              provider: "Provider",
              year: "Year",
            })
          }
        >
          + Add course
        </button>

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          LANGUAGES
        </h2>
        {languages.map((lang) => (
          <div key={lang.id} style={{ marginBottom: "10px" }}>
            <input
              style={{ ...sidebarFieldStyle, fontSize: "12px" }}
              value={lang.name}
              onChange={(e) =>
                updateBlockField(
                  languages,
                  setLanguages,
                  lang.id,
                  "name",
                  e.target.value,
                )
              }
            />
            <div style={barStyle}>
              <div style={barFillStyle(lang.level)} />
            </div>
          </div>
        ))}
      </div>

      {/* Right main column */}
      <div
        style={{
          flex: 1,
          padding: "24px 32px",
          backgroundColor: "white",
          borderTop: `10px solid ${TEAL}`,
        }}
      >
        <input
          style={{
            fontSize: "34px",
            fontWeight: "bold",
            border: "none",
            outline: "none",
            width: "100%",
            textTransform: "uppercase",
          }}
          value={personal.name}
          onChange={(e) => updateField(setPersonal, "name", e.target.value)}
        />
        <input
          style={{
            ...fieldStyle,
            fontSize: "18px",
            color: TEXT_MUTED,
            marginBottom: "16px",
          }}
          value={personal.title}
          onChange={(e) => updateField(setPersonal, "title", e.target.value)}
        />

        <textarea
          style={{
            ...fieldStyle,
            borderBottom: "none",
            resize: "vertical",
            marginBottom: "16px",
          }}
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "18px",
              color: TEAL,
              borderBottom: `2px solid ${TEAL}`,
              paddingBottom: "4px",
            }}
          >
            EMPLOYMENT HISTORY
          </h2>
          {employmentHistory.map((job) => (
            <div
              key={job.id}
              style={{ marginTop: "12px", marginBottom: "12px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{ ...fieldStyle, fontWeight: "bold", width: "60%" }}
                  value={job.role}
                  onChange={(e) =>
                    updateBlockField(
                      employmentHistory,
                      setEmploymentHistory,
                      job.id,
                      "role",
                      e.target.value,
                    )
                  }
                />
                <input
                  style={{ ...fieldStyle, width: "35%" }}
                  value={job.dates}
                  onChange={(e) =>
                    updateBlockField(
                      employmentHistory,
                      setEmploymentHistory,
                      job.id,
                      "dates",
                      e.target.value,
                    )
                  }
                />
              </div>
              <input
                style={{ ...fieldStyle, fontWeight: "bold" }}
                value={job.company}
                onChange={(e) =>
                  updateBlockField(
                    employmentHistory,
                    setEmploymentHistory,
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
                          employmentHistory,
                          setEmploymentHistory,
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
                          employmentHistory,
                          setEmploymentHistory,
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
                style={addBtnStyle}
                onClick={() =>
                  addBullet(employmentHistory, setEmploymentHistory, job.id)
                }
              >
                + Add bullet
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(employmentHistory, setEmploymentHistory, {
                id: nextId(),
                role: "Role",
                dates: "Mon Year - Present",
                company: "Company, Location",
                bullets: ["New bullet point"],
              })
            }
          >
            + Add role
          </button>
        </section>

        <section style={{ marginBottom: "16px" }}>
          <h2
            style={{
              fontSize: "18px",
              color: TEAL,
              borderBottom: `2px solid ${TEAL}`,
              paddingBottom: "4px",
            }}
          >
            EDUCATION
          </h2>
          {education.map((edu) => (
            <div
              key={edu.id}
              style={{ marginTop: "12px", marginBottom: "12px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{ ...fieldStyle, fontWeight: "bold", width: "60%" }}
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
                <input
                  style={{ ...fieldStyle, width: "35%" }}
                  value={edu.year}
                  onChange={(e) =>
                    updateBlockField(
                      education,
                      setEducation,
                      edu.id,
                      "year",
                      e.target.value,
                    )
                  }
                />
              </div>
              <input
                style={{ ...fieldStyle, fontWeight: "bold" }}
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
              <button
                style={removeBtnStyle}
                onClick={() => removeBlockItem(education, setEducation, edu.id)}
              >
                ✕ remove
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(education, setEducation, {
                id: nextId(),
                degree: "Degree",
                year: "Year",
                school: "School",
              })
            }
          >
            + Add education
          </button>
        </section>

        <button
          style={{
            backgroundColor: TEAL,
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
   TEMPLATE 2 — Dark navy header + cream sidebar (Image 2)
   ============================================================ */
function BackEndCvDarkCream(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Jimmy Chris",
      title: "Backend Developer",
      photoUrl: "",
      email: "jimmychris@gmail.com",
      phone: "(835) 452 4617",
      location: "Hudsonville, 21905-9985, West Virginia",
    },
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Experienced backend developer with 7 years of full-stack development expertise. Proven ability to develop and maintain efficient, secure, and scalable applications for businesses of all sizes.",
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Bachelor's of Computer Science",
        school: "University of Washington",
        years: "2017 - 2021",
      },
    ],
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      { id: nextId(), name: "Database Management", level: "Expert" },
      { id: nextId(), name: "Programming languages", level: "Expert" },
      { id: nextId(), name: "System Architecture", level: "Expert" },
      { id: nextId(), name: "Web Servers", level: "Expert" },
      { id: nextId(), name: "API Development", level: "Expert" },
      { id: nextId(), name: "Cloud Computing", level: "Expert" },
    ],
  );

  const [workExperience, setWorkExperience] = useState(
    initialData?.workExperience || [
      {
        id: nextId(),
        title: "Backend Developer, Maggio, Goldner and Lang",
        dates: "March 2023 - Present",
        bullets: [
          "Developed a backend solution to increase system efficiency by 20%, resulting in faster completion of projects.",
        ],
      },
    ],
  );

  const [references, setReferences] = useState(
    initialData?.references || "References available upon request",
  );

  const handleSave = () => {
    if (onSave)
      onSave({
        personal,
        summary,
        education,
        skills,
        workExperience,
        references,
      });
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
      <div
        style={{
          backgroundColor: NAVY,
          padding: "32px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <div>
          <img
            src={personal.photoUrl || "https://via.placeholder.com/100"}
            alt="Profile"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid white",
            }}
          />
          <input
            style={{
              ...fieldStyle,
              color: "white",
              fontSize: "11px",
              marginTop: "4px",
              width: "90px",
            }}
            placeholder="Photo URL"
            value={personal.photoUrl}
            onChange={(e) =>
              updateField(setPersonal, "photoUrl", e.target.value)
            }
          />
        </div>
        <div style={{ flex: 1 }}>
          <input
            style={{
              ...fieldStyle,
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
              borderBottom: "none",
            }}
            value={personal.name}
            onChange={(e) => updateField(setPersonal, "name", e.target.value)}
          />
          <input
            style={{
              ...fieldStyle,
              color: "#D1D5DB",
              fontSize: "18px",
              borderBottom: "none",
            }}
            value={personal.title}
            onChange={(e) => updateField(setPersonal, "title", e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: "flex" }}>
        <div
          style={{ width: "260px", backgroundColor: CREAM, padding: "24px" }}
        >
          <h2
            style={{ fontSize: "18px", color: TEXT_DARK, marginBottom: "8px" }}
          >
            Contact Details
          </h2>
          {["email", "phone", "location"].map((field) => (
            <div
              key={field}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span style={{ marginRight: "8px" }}>
                {field === "email" && "✉️"}
                {field === "phone" && "📞"}
                {field === "location" && "📍"}
              </span>
              <input
                style={fieldStyle}
                value={personal[field]}
                onChange={(e) =>
                  updateField(setPersonal, field, e.target.value)
                }
              />
            </div>
          ))}

          <h2
            style={{
              fontSize: "18px",
              color: TEXT_DARK,
              marginTop: "20px",
              marginBottom: "8px",
            }}
          >
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "12px" }}>
              <input
                style={{ ...fieldStyle, fontWeight: "bold" }}
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
              <input
                style={fieldStyle}
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
              <input
                style={fieldStyle}
                value={edu.years}
                onChange={(e) =>
                  updateBlockField(
                    education,
                    setEducation,
                    edu.id,
                    "years",
                    e.target.value,
                  )
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() => removeBlockItem(education, setEducation, edu.id)}
              >
                ✕ remove
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(education, setEducation, {
                id: nextId(),
                degree: "Degree",
                school: "School",
                years: "Year - Year",
              })
            }
          >
            + Add education
          </button>

          <h2
            style={{
              fontSize: "18px",
              color: TEXT_DARK,
              marginTop: "20px",
              marginBottom: "8px",
            }}
          >
            Skills
          </h2>
          {skills.map((skill) => (
            <div
              key={skill.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <input
                style={{ ...fieldStyle, width: "60%" }}
                value={skill.name}
                onChange={(e) =>
                  updateBlockField(
                    skills,
                    setSkills,
                    skill.id,
                    "name",
                    e.target.value,
                  )
                }
              />
              <input
                style={{ ...fieldStyle, width: "35%" }}
                value={skill.level}
                onChange={(e) =>
                  updateBlockField(
                    skills,
                    setSkills,
                    skill.id,
                    "level",
                    e.target.value,
                  )
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() => removeBlockItem(skills, setSkills, skill.id)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(skills, setSkills, {
                id: nextId(),
                name: "New skill",
                level: "Expert",
              })
            }
          >
            + Add skill
          </button>
        </div>

        <div
          style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}
        >
          <section style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "20px",
                borderBottom: `1px solid ${TEXT_DARK}`,
                paddingBottom: "4px",
              }}
            >
              Summary
            </h2>
            <textarea
              style={{
                ...fieldStyle,
                borderBottom: "none",
                resize: "vertical",
                marginTop: "8px",
              }}
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </section>

          <section style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "20px",
                borderBottom: `1px solid ${TEXT_DARK}`,
                paddingBottom: "4px",
              }}
            >
              Work Experience
            </h2>
            {workExperience.map((job) => (
              <div
                key={job.id}
                style={{ marginTop: "12px", marginBottom: "12px" }}
              >
                <input
                  style={{
                    ...fieldStyle,
                    fontWeight: "bold",
                    fontSize: "16px",
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
                <input
                  style={{ ...fieldStyle, color: TEXT_MUTED }}
                  value={job.dates}
                  onChange={(e) =>
                    updateBlockField(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "dates",
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
                  style={addBtnStyle}
                  onClick={() =>
                    addBullet(workExperience, setWorkExperience, job.id)
                  }
                >
                  + Add bullet
                </button>
              </div>
            ))}
            <button
              style={addBtnStyle}
              onClick={() =>
                addBlockItem(workExperience, setWorkExperience, {
                  id: nextId(),
                  title: "Job Title, Company",
                  dates: "Mon Year - Present",
                  bullets: ["New bullet point"],
                })
              }
            >
              + Add work experience
            </button>
          </section>

          <section style={{ marginBottom: "16px" }}>
            <h2
              style={{
                fontSize: "20px",
                borderBottom: `1px solid ${TEXT_DARK}`,
                paddingBottom: "4px",
              }}
            >
              References
            </h2>
            <input
              style={{ ...fieldStyle, marginTop: "8px" }}
              value={references}
              onChange={(e) => setReferences(e.target.value)}
            />
          </section>

          <button
            style={{
              backgroundColor: NAVY,
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
    </div>
  );
}

/* ============================================================
   TEMPLATE 3 — Purple sidebar with dot-rated languages (Image 3)
   ============================================================ */
function BackEndCvPurpleSidebar(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Rachel Frank",
      title: "Back-End Developer",
      photoUrl: "",
      email: "info@resumekraft.com",
      phone: "202-555-0120",
      location: "Chicago, Illinois, US",
      linkedin: "linkedin.com/resumekraft",
    },
  );

  const [summaryBullets, setSummaryBullets] = useState(
    initialData?.summaryBullets || [
      "I am a self-reliant, dependable, and approachable individual who is dedicated to pursuing excellence in my professional journey.",
      "Adaptable quickly, and organized well. Interested in learning the latest web & software technologies quickly.",
    ],
  );

  const [projects, setProjects] = useState(
    initialData?.projects || [
      {
        id: nextId(),
        title: "Cinema App",
        dates: "Jun 2023 - Jul 2023",
        bullets: [
          "Developed in PHP and MySQL.",
          "This application is developed for booking cinema tickets and watching trailers on the website.",
        ],
      },
      {
        id: nextId(),
        title: "Base64",
        dates: "Feb 2023 - Mar 2023",
        bullets: [
          "Developed in Python.",
          "Base64 is a form of encoding that uses text to transmit data.",
        ],
      },
    ],
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      { id: nextId(), name: "C++", level: 80 },
      { id: nextId(), name: "Java", level: 90 },
      { id: nextId(), name: "JavaScript", level: 75 },
      { id: nextId(), name: "Python", level: 85 },
      { id: nextId(), name: "PHP", level: 70 },
      { id: nextId(), name: "MongoDB", level: 65 },
    ],
  );

  const [languages, setLanguages] = useState(
    initialData?.languages || [
      { id: nextId(), name: "English", level: 5 },
      { id: nextId(), name: "French", level: 4 },
    ],
  );

  const handleSave = () => {
    if (onSave)
      onSave({ personal, summaryBullets, projects, skills, languages });
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

  const sidebarFieldStyle = {
    ...fieldStyle,
    color: "white",
    borderBottom: "1px dashed rgba(255,255,255,0.3)",
  };

  const barStyle = {
    height: "5px",
    borderRadius: "3px",
    backgroundColor: "rgba(255,255,255,0.25)",
    width: "100%",
    marginTop: "4px",
  };
  const barFillStyle = (level) => ({
    height: "5px",
    borderRadius: "3px",
    backgroundColor: "white",
    width: `${level}%`,
  });

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
      {/* Left main column */}
      <div style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}>
        <div
          style={{
            backgroundColor: "#F5F5F5",
            padding: "16px",
            marginBottom: "20px",
          }}
        >
          <input
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              border: "none",
              outline: "none",
              width: "100%",
            }}
            value={personal.name}
            onChange={(e) => updateField(setPersonal, "name", e.target.value)}
          />
          <input
            style={{ ...fieldStyle, color: TEXT_MUTED, letterSpacing: "1px" }}
            value={personal.title}
            onChange={(e) => updateField(setPersonal, "title", e.target.value)}
          />
        </div>

        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", color: PURPLE }}>SUMMARY</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {summaryBullets.map((bullet, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <input
                style={{ ...fieldStyle, flex: 1 }}
                value={bullet}
                onChange={(e) =>
                  updateListItem(
                    summaryBullets,
                    setSummaryBullets,
                    index,
                    e.target.value,
                  )
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() =>
                  removeListItem(summaryBullets, setSummaryBullets, index)
                }
              >
                ✕
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addListItem(
                summaryBullets,
                setSummaryBullets,
                "New summary point",
              )
            }
          >
            + Add point
          </button>
        </section>

        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "18px", color: PURPLE }}>PROJECTS</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{ ...fieldStyle, fontWeight: "bold", width: "60%" }}
                  value={project.title}
                  onChange={(e) =>
                    updateBlockField(
                      projects,
                      setProjects,
                      project.id,
                      "title",
                      e.target.value,
                    )
                  }
                />
                <input
                  style={{
                    ...fieldStyle,
                    color: PURPLE,
                    fontWeight: "bold",
                    width: "35%",
                  }}
                  value={project.dates}
                  onChange={(e) =>
                    updateBlockField(
                      projects,
                      setProjects,
                      project.id,
                      "dates",
                      e.target.value,
                    )
                  }
                />
              </div>
              <ul style={{ paddingLeft: "18px", margin: "6px 0" }}>
                {project.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <input
                      style={{ ...fieldStyle, flex: 1 }}
                      value={bullet}
                      onChange={(e) =>
                        updateBullet(
                          projects,
                          setProjects,
                          project.id,
                          bulletIndex,
                          e.target.value,
                        )
                      }
                    />
                    <button
                      style={removeBtnStyle}
                      onClick={() =>
                        removeBullet(
                          projects,
                          setProjects,
                          project.id,
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
                style={addBtnStyle}
                onClick={() => addBullet(projects, setProjects, project.id)}
              >
                + Add bullet
              </button>
              <button
                style={{ ...addBtnStyle, marginLeft: "8px", color: "#EF4444" }}
                onClick={() =>
                  removeBlockItem(projects, setProjects, project.id)
                }
              >
                Remove project
              </button>
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(projects, setProjects, {
                id: nextId(),
                title: "Project name",
                dates: "Mon Year - Mon Year",
                bullets: ["New bullet point"],
              })
            }
          >
            + Add project
          </button>
        </section>

        <button
          style={{
            backgroundColor: PURPLE,
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

      {/* Right purple sidebar */}
      <div
        style={{
          width: "260px",
          backgroundColor: PURPLE,
          padding: "24px",
          color: "white",
        }}
      >
        <img
          src={personal.photoUrl || "https://via.placeholder.com/100"}
          alt="Profile"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid white",
          }}
        />
        <input
          style={{ ...sidebarFieldStyle, fontSize: "11px", marginTop: "4px" }}
          placeholder="Photo URL"
          value={personal.photoUrl}
          onChange={(e) => updateField(setPersonal, "photoUrl", e.target.value)}
        />

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          CONTACT
        </h2>
        {["email", "phone", "location", "linkedin"].map((field) => (
          <div key={field} style={{ marginBottom: "8px" }}>
            <input
              style={{ ...sidebarFieldStyle, fontSize: "12px" }}
              value={personal[field]}
              onChange={(e) => updateField(setPersonal, field, e.target.value)}
            />
          </div>
        ))}

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          SKILLS
        </h2>
        {skills.map((skill) => (
          <div key={skill.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ ...sidebarFieldStyle, fontSize: "12px" }}
                value={skill.name}
                onChange={(e) =>
                  updateBlockField(
                    skills,
                    setSkills,
                    skill.id,
                    "name",
                    e.target.value,
                  )
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() => removeBlockItem(skills, setSkills, skill.id)}
              >
                ✕
              </button>
            </div>
            <div style={barStyle}>
              <div style={barFillStyle(skill.level)} />
            </div>
          </div>
        ))}
        <button
          style={{
            ...addBtnStyle,
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() =>
            addBlockItem(skills, setSkills, {
              id: nextId(),
              name: "New skill",
              level: 50,
            })
          }
        >
          + Add skill
        </button>

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          LANGUAGES
        </h2>
        {languages.map((lang) => (
          <div
            key={lang.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <input
              style={{ ...sidebarFieldStyle, fontSize: "12px", width: "50%" }}
              value={lang.name}
              onChange={(e) =>
                updateBlockField(
                  languages,
                  setLanguages,
                  lang.id,
                  "name",
                  e.target.value,
                )
              }
            />
            <div style={{ display: "flex", gap: "3px" }}>
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  onClick={() =>
                    updateBlockField(
                      languages,
                      setLanguages,
                      lang.id,
                      "level",
                      dot,
                    )
                  }
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor:
                      dot <= lang.level ? "white" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   BACK-END DEVELOPER CV DIVISION — shows all three templates
   next to their reference images
   ============================================================ */
function BackEndCvSection(props) {
  const templates = [
    {
      key: "geometric",
      label: "Template 1 — Charcoal / Teal Geometric",
      image: geometricTemplateImg,
      Component: BackEndCvGeometric,
    },
    {
      key: "dark-cream",
      label: "Template 2 — Dark Navy / Cream",
      image: darkCreamTemplateImg,
      Component: BackEndCvDarkCream,
    },
    {
      key: "purple",
      label: "Template 3 — Purple Sidebar",
      image: purpleTemplateImg,
      Component: BackEndCvPurpleSidebar,
    },
  ];

  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>
        Back-End Developer CV
      </h1>
      <p style={{ color: TEXT_MUTED, marginBottom: "32px" }}>
        Target role: Backend Development — choose a template and fill in your
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

export default BackEndCvSection;
export { BackEndCvGeometric, BackEndCvDarkCream, BackEndCvPurpleSidebar };
