import { useState } from "react";

// Reference screenshots — save the three Frontend CV example images into
// your assets folder with these names (or update the paths).
import darkCreamTemplateImg from "../assets/FrontEnd1.png";
import darkSidebarTemplateImg from "../assets/FrontEnd2.png";
import minimalTemplateImg from "../assets/FrontEnd3.webp";

// ---------- Shared colors ----------
const NAVY = "#2B2E3B";
const CREAM = "#F3E8DE";
const DARK_GRAY = "#3A3A3A";
const ACCENT_GRAY = "#6B7280";
const TEXT_DARK = "#1F2937";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";

let idCounter = 200;
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
   TEMPLATE 1 — Dark navy header + cream sidebar (Image 1)
   ============================================================ */
function FrontEndCvDarkCream(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Suzan Kihn",
      title: "Front End Web Developer",
      photoUrl: "",
      email: "suzankihn@gmail.com",
      phone: "(613) 900 3481",
      location: "Port Laury, 85387, Wisconsin",
    },
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Experienced Front End Web Developer specializing in HTML/CSS, JavaScript, and React. Skilled in creating intuitive, user-friendly websites and applications.",
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Bachelor of Science in Computer Science",
        school: "University of California, Berkeley",
        years: "2017 - 2021",
      },
    ],
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      { id: nextId(), name: "HTML/CSS", level: "Expert" },
      { id: nextId(), name: "JavaScript", level: "Expert" },
      { id: nextId(), name: "jQuery", level: "Expert" },
      { id: nextId(), name: "React/Vue", level: "Expert" },
      { id: nextId(), name: "AJAX", level: "Expert" },
      { id: nextId(), name: "Bootstrap", level: "Expert" },
    ],
  );

  const [workExperience, setWorkExperience] = useState(
    initialData?.workExperience || [
      {
        id: nextId(),
        title: "Front End Web Developer, Wilkinson and Sons",
        dates: "March 2023 - Present",
        bullets: [
          "Developed front-end user interfaces for several complex web applications with HTML, CSS, and JavaScript.",
          "Utilized React frameworks to create interactive, responsive, and user-friendly web designs.",
        ],
      },
      {
        id: nextId(),
        title: "Front End Web Developer, Romaguera LLC",
        dates: "May 2021 - February 2023",
        bullets: [
          "Optimized websites for maximum speed and scalability across browsers and devices.",
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
      {/* Header band */}
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
        {/* Left sidebar */}
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

        {/* Right main column */}
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
   TEMPLATE 2 — Full dark sidebar with links/hobbies (Image 2)
   ============================================================ */
function FrontEndCvDarkSidebar(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Chandler Bing",
      title: "Front End Developer",
      photoUrl: "",
      location: "New York, USA, New York, 10001, USA",
      phone: "+1 123 456 7890",
      email: "chandler.bing@gmail.com",
    },
  );

  const [aboutMe, setAboutMe] = useState(
    initialData?.aboutMe ||
      "Experienced Front End Developer with a demonstrated history of working in the information technology and services industry. Skilled in HTML, CSS, JavaScript, and popular frameworks like React and Vue.js.",
  );

  const [links, setLinks] = useState(
    initialData?.links || [
      {
        id: nextId(),
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/chandlerbing",
      },
      {
        id: nextId(),
        label: "Twitter",
        url: "https://twitter.com/chandlerbing",
      },
    ],
  );

  const [references, setReferences] = useState(
    initialData?.references || [
      {
        id: nextId(),
        name: "Ross Geller",
        company: "Central Perk Tech",
        phone: "+1 234 567 8901",
        email: "ross.geller@centralperktech.com",
      },
    ],
  );

  const [hobbies, setHobbies] = useState(
    initialData?.hobbies || [
      "Playing foosball",
      "Making jokes",
      "Reading comic books",
    ],
  );

  const [workExperience, setWorkExperience] = useState(
    initialData?.workExperience || [
      {
        id: nextId(),
        role: "Senior Front End Developer",
        company: "Central Perk Tech",
        location: "New York",
        dates: "Jan 2017 - Dec 2021",
        bullets: [
          "Led a team of 5 developers to build and maintain the company's main website.",
        ],
      },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Bachelor's degree in Computer Science",
        school: "New York University",
        location: "New York",
        year: "2011",
        bullets: [
          "Specialized in Software Development.",
          "Graduated with Honors.",
        ],
      },
    ],
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      { id: nextId(), name: "HTML", level: 90 },
      { id: nextId(), name: "CSS", level: 85 },
      { id: nextId(), name: "JavaScript", level: 90 },
      { id: nextId(), name: "React", level: 85 },
    ],
  );

  const [languages, setLanguages] = useState(
    initialData?.languages || [
      { id: nextId(), name: "English", level: 100 },
      { id: nextId(), name: "Spanish", level: 60 },
    ],
  );

  const handleSave = () => {
    if (onSave)
      onSave({
        personal,
        aboutMe,
        links,
        references,
        hobbies,
        workExperience,
        education,
        skills,
        languages,
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

  const barStyle = (level) => ({
    height: "6px",
    borderRadius: "3px",
    backgroundColor: BORDER,
    width: "100%",
    marginTop: "4px",
    position: "relative",
  });

  const barFillStyle = (level) => ({
    height: "6px",
    borderRadius: "3px",
    backgroundColor: DARK_GRAY,
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
      {/* Left dark sidebar */}
      <div
        style={{
          width: "260px",
          backgroundColor: DARK_GRAY,
          padding: "24px",
          color: "white",
        }}
      >
        <div>
          <img
            src={personal.photoUrl || "https://via.placeholder.com/90"}
            alt="Profile"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <input
            style={{ ...sidebarFieldStyle, fontSize: "11px", marginTop: "4px" }}
            placeholder="Photo URL"
            value={personal.photoUrl}
            onChange={(e) =>
              updateField(setPersonal, "photoUrl", e.target.value)
            }
          />
        </div>

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          ABOUT ME
        </h2>
        <textarea
          style={{
            ...sidebarFieldStyle,
            borderBottom: "none",
            resize: "vertical",
            fontSize: "12px",
          }}
          rows={6}
          value={aboutMe}
          onChange={(e) => setAboutMe(e.target.value)}
        />

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          LINKS
        </h2>
        {links.map((link) => (
          <div key={link.id} style={{ marginBottom: "8px" }}>
            <input
              style={{ ...sidebarFieldStyle, fontWeight: "bold" }}
              value={link.label}
              onChange={(e) =>
                updateBlockField(
                  links,
                  setLinks,
                  link.id,
                  "label",
                  e.target.value,
                )
              }
            />
            <input
              style={sidebarFieldStyle}
              value={link.url}
              onChange={(e) =>
                updateBlockField(
                  links,
                  setLinks,
                  link.id,
                  "url",
                  e.target.value,
                )
              }
            />
            <button
              style={removeBtnStyle}
              onClick={() => removeBlockItem(links, setLinks, link.id)}
            >
              ✕
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
            addBlockItem(links, setLinks, {
              id: nextId(),
              label: "Label",
              url: "https://",
            })
          }
        >
          + Add link
        </button>

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          REFERENCES
        </h2>
        {references.map((ref) => (
          <div key={ref.id} style={{ marginBottom: "10px" }}>
            <input
              style={{ ...sidebarFieldStyle, fontWeight: "bold" }}
              value={ref.name}
              onChange={(e) =>
                updateBlockField(
                  references,
                  setReferences,
                  ref.id,
                  "name",
                  e.target.value,
                )
              }
            />
            <input
              style={sidebarFieldStyle}
              value={ref.company}
              onChange={(e) =>
                updateBlockField(
                  references,
                  setReferences,
                  ref.id,
                  "company",
                  e.target.value,
                )
              }
            />
            <input
              style={sidebarFieldStyle}
              value={ref.phone}
              onChange={(e) =>
                updateBlockField(
                  references,
                  setReferences,
                  ref.id,
                  "phone",
                  e.target.value,
                )
              }
            />
            <input
              style={sidebarFieldStyle}
              value={ref.email}
              onChange={(e) =>
                updateBlockField(
                  references,
                  setReferences,
                  ref.id,
                  "email",
                  e.target.value,
                )
              }
            />
            <button
              style={removeBtnStyle}
              onClick={() => removeBlockItem(references, setReferences, ref.id)}
            >
              ✕
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
            addBlockItem(references, setReferences, {
              id: nextId(),
              name: "Name",
              company: "Company",
              phone: "Phone",
              email: "Email",
            })
          }
        >
          + Add reference
        </button>

        <h2
          style={{ fontSize: "14px", letterSpacing: "1px", marginTop: "16px" }}
        >
          HOBBIES
        </h2>
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <input
              style={sidebarFieldStyle}
              value={hobby}
              onChange={(e) =>
                updateListItem(hobbies, setHobbies, index, e.target.value)
              }
            />
            <button
              style={removeBtnStyle}
              onClick={() => removeListItem(hobbies, setHobbies, index)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          style={{
            ...addBtnStyle,
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() => addListItem(hobbies, setHobbies, "New hobby")}
        >
          + Add hobby
        </button>
      </div>

      {/* Right main column */}
      <div style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div>
            <input
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                border: "none",
                outline: "none",
                letterSpacing: "1px",
              }}
              value={personal.name}
              onChange={(e) => updateField(setPersonal, "name", e.target.value)}
            />
            <input
              style={{ ...fieldStyle, color: TEXT_MUTED, letterSpacing: "1px" }}
              value={personal.title}
              onChange={(e) =>
                updateField(setPersonal, "title", e.target.value)
              }
            />
          </div>
          <div style={{ textAlign: "right" }}>
            <input
              style={{ ...fieldStyle, textAlign: "right" }}
              value={personal.location}
              onChange={(e) =>
                updateField(setPersonal, "location", e.target.value)
              }
            />
            <input
              style={{ ...fieldStyle, textAlign: "right" }}
              value={personal.phone}
              onChange={(e) =>
                updateField(setPersonal, "phone", e.target.value)
              }
            />
            <input
              style={{ ...fieldStyle, textAlign: "right" }}
              value={personal.email}
              onChange={(e) =>
                updateField(setPersonal, "email", e.target.value)
              }
            />
          </div>
        </div>

        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              borderBottom: `1px solid ${BORDER}`,
              paddingBottom: "4px",
            }}
          >
            WORK EXPERIENCE
          </h2>
          {workExperience.map((job) => (
            <div
              key={job.id}
              style={{
                display: "flex",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{ width: "160px", fontSize: "13px", color: TEXT_MUTED }}
              >
                <input
                  style={fieldStyle}
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
                <input
                  style={fieldStyle}
                  value={job.location}
                  onChange={(e) =>
                    updateBlockField(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "location",
                      e.target.value,
                    )
                  }
                />
                <input
                  style={fieldStyle}
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
              </div>
              <div
                style={{
                  flex: 1,
                  paddingLeft: "16px",
                  borderLeft: `2px solid ${DARK_GRAY}`,
                }}
              >
                <input
                  style={{ ...fieldStyle, fontWeight: "bold" }}
                  value={job.role}
                  onChange={(e) =>
                    updateBlockField(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "role",
                      e.target.value,
                    )
                  }
                />
                <ul style={{ paddingLeft: "18px", margin: "6px 0" }}>
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
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(workExperience, setWorkExperience, {
                id: nextId(),
                role: "Role",
                company: "Company",
                location: "Location",
                dates: "Mon Year - Mon Year",
                bullets: ["New bullet point"],
              })
            }
          >
            + Add work experience
          </button>
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              borderBottom: `1px solid ${BORDER}`,
              paddingBottom: "4px",
            }}
          >
            EDUCATION
          </h2>
          {education.map((edu) => (
            <div
              key={edu.id}
              style={{
                display: "flex",
                marginTop: "12px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{ width: "160px", fontSize: "13px", color: TEXT_MUTED }}
              >
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
                  value={edu.location}
                  onChange={(e) =>
                    updateBlockField(
                      education,
                      setEducation,
                      edu.id,
                      "location",
                      e.target.value,
                    )
                  }
                />
                <input
                  style={fieldStyle}
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
              <div
                style={{
                  flex: 1,
                  paddingLeft: "16px",
                  borderLeft: `2px solid ${DARK_GRAY}`,
                }}
              >
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
                <ul style={{ paddingLeft: "18px", margin: "6px 0" }}>
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
            </div>
          ))}
        </section>

        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              borderBottom: `1px solid ${BORDER}`,
              paddingBottom: "4px",
            }}
          >
            SKILLS
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {skills.map((skill) => (
              <div key={skill.id} style={{ width: "45%" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{
                      ...fieldStyle,
                      fontSize: "12px",
                      letterSpacing: "1px",
                    }}
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
                <div style={barStyle(skill.level)}>
                  <div style={barFillStyle(skill.level)} />
                </div>
              </div>
            ))}
          </div>
          <button
            style={addBtnStyle}
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
        </section>

        <section style={{ marginBottom: "16px" }}>
          <h2
            style={{
              fontSize: "16px",
              letterSpacing: "1px",
              borderBottom: `1px solid ${BORDER}`,
              paddingBottom: "4px",
            }}
          >
            LANGUAGES
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "8px",
            }}
          >
            {languages.map((lang) => (
              <div key={lang.id} style={{ width: "45%" }}>
                <input
                  style={{
                    ...fieldStyle,
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
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
                <div style={barStyle(lang.level)}>
                  <div style={barFillStyle(lang.level)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <button
          style={{
            backgroundColor: DARK_GRAY,
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
   TEMPLATE 3 — Minimal black/white with timeline (Image 3)
   ============================================================ */
function FrontEndCvMinimal(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Anthony Thompson",
      title: "Front End React Developer",
      photoUrl: "",
      phone: "(555) 456-7890",
      email: "anthony.thompson@email.com",
      location: "Austin, TX",
      github: "anthony-thompson",
    },
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Innovative front-end React developer with 9 years of experience building scalable and performant web applications. Skilled in React.js, Redux, and modern JavaScript tools.",
  );

  const [education, setEducation] = useState(
    initialData?.education || {
      degree: "Bachelor of Science in Software Engineering",
      school: "Texas State University, San Marcos, TX",
      year: "2016",
    },
  );

  const [certifications, setCertifications] = useState(
    initialData?.certifications || [
      "Advanced React and Redux by Udemy — 2023",
      "React Native Developer Certificate — 2021",
    ],
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      { id: nextId(), name: "React.js, Redux, Context API", level: "Expert" },
      { id: nextId(), name: "JavaScript ES6+, TypeScript", level: "Expert" },
      { id: nextId(), name: "RESTful APIs, GraphQL", level: "Expert" },
      { id: nextId(), name: "Testing (Jest, Enzyme)", level: "Expert" },
    ],
  );

  const [experience, setExperience] = useState(
    initialData?.experience || [
      {
        id: nextId(),
        dateRange: "2018 - Now",
        role: "Senior React Developer",
        company: "TechNova Solutions / Austin, TX",
        bullets: [
          "Develop and maintain React applications for enterprise clients, handling complex state management with Redux.",
        ],
      },
      {
        id: nextId(),
        dateRange: "2016 - 2018",
        role: "Front-End Developer",
        company: "BrightPixel Digital / Austin, TX",
        bullets: [
          "Created reusable React components to streamline development and maintain consistency across projects.",
        ],
      },
    ],
  );

  const [openSource, setOpenSource] = useState(
    initialData?.openSource || [
      "Actively contributed to the React Open Source community, including resolving issues and submitting pull requests for popular libraries like React Router.",
    ],
  );

  const handleSave = () => {
    if (onSave)
      onSave({
        personal,
        summary,
        education,
        certifications,
        skills,
        experience,
        openSource,
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
        padding: "32px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <input
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              border: "none",
              outline: "none",
              textTransform: "uppercase",
            }}
            value={personal.name}
            onChange={(e) => updateField(setPersonal, "name", e.target.value)}
          />
          <input
            style={{ ...fieldStyle, color: TEXT_MUTED }}
            value={personal.title}
            onChange={(e) => updateField(setPersonal, "title", e.target.value)}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <input
            style={{ ...fieldStyle, textAlign: "right" }}
            value={personal.phone}
            onChange={(e) => updateField(setPersonal, "phone", e.target.value)}
          />
          <input
            style={{ ...fieldStyle, textAlign: "right" }}
            value={personal.email}
            onChange={(e) => updateField(setPersonal, "email", e.target.value)}
          />
          <input
            style={{ ...fieldStyle, textAlign: "right" }}
            value={personal.location}
            onChange={(e) =>
              updateField(setPersonal, "location", e.target.value)
            }
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "24px", marginTop: "16px" }}>
        <div style={{ width: "180px" }}>
          <img
            src={personal.photoUrl || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <input
            style={{ ...fieldStyle, fontSize: "11px", marginTop: "4px" }}
            placeholder="Photo URL"
            value={personal.photoUrl}
            onChange={(e) =>
              updateField(setPersonal, "photoUrl", e.target.value)
            }
          />
          <div style={{ marginTop: "12px", fontSize: "13px" }}>
            GitHub: /
            <input
              style={{ ...fieldStyle, display: "inline", width: "auto" }}
              value={personal.github}
              onChange={(e) =>
                updateField(setPersonal, "github", e.target.value)
              }
            />
          </div>

          <h2
            style={{
              fontSize: "14px",
              letterSpacing: "1px",
              marginTop: "16px",
            }}
          >
            EDUCATION
          </h2>
          <input
            style={{ ...fieldStyle, fontWeight: "bold" }}
            value={education.degree}
            onChange={(e) =>
              setEducation({ ...education, degree: e.target.value })
            }
          />
          <input
            style={fieldStyle}
            value={education.school}
            onChange={(e) =>
              setEducation({ ...education, school: e.target.value })
            }
          />
          <input
            style={fieldStyle}
            value={education.year}
            onChange={(e) =>
              setEducation({ ...education, year: e.target.value })
            }
          />

          <h2
            style={{
              fontSize: "14px",
              letterSpacing: "1px",
              marginTop: "16px",
            }}
          >
            CERTIFICATIONS
          </h2>
          {certifications.map((cert, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <input
                style={fieldStyle}
                value={cert}
                onChange={(e) =>
                  updateListItem(
                    certifications,
                    setCertifications,
                    index,
                    e.target.value,
                  )
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() =>
                  removeListItem(certifications, setCertifications, index)
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
                certifications,
                setCertifications,
                "New certification",
              )
            }
          >
            + Add
          </button>

          <h2
            style={{
              fontSize: "14px",
              letterSpacing: "1px",
              marginTop: "16px",
            }}
          >
            SKILLS
          </h2>
          {skills.map((skill) => (
            <div
              key={skill.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "6px",
              }}
            >
              <input
                style={{ ...fieldStyle, flex: 1 }}
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
                style={{ ...fieldStyle, width: "60px" }}
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

        <div style={{ flex: 1 }}>
          <section style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "16px",
                letterSpacing: "1px",
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: "4px",
              }}
            >
              PROFESSIONAL SUMMARY
            </h2>
            <textarea
              style={{
                ...fieldStyle,
                borderBottom: "none",
                resize: "vertical",
                marginTop: "6px",
              }}
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </section>

          <section style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "16px",
                letterSpacing: "1px",
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: "4px",
              }}
            >
              EXPERIENCE
            </h2>
            {experience.map((job) => (
              <div
                key={job.id}
                style={{
                  display: "flex",
                  marginTop: "12px",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    fontSize: "12px",
                    color: TEXT_MUTED,
                    borderLeft: `2px solid ${ACCENT_GRAY}`,
                    paddingLeft: "10px",
                  }}
                >
                  <input
                    style={fieldStyle}
                    value={job.dateRange}
                    onChange={(e) =>
                      updateBlockField(
                        experience,
                        setExperience,
                        job.id,
                        "dateRange",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div style={{ flex: 1, paddingLeft: "16px" }}>
                  <input
                    style={{ ...fieldStyle, fontWeight: "bold" }}
                    value={job.role}
                    onChange={(e) =>
                      updateBlockField(
                        experience,
                        setExperience,
                        job.id,
                        "role",
                        e.target.value,
                      )
                    }
                  />
                  <input
                    style={fieldStyle}
                    value={job.company}
                    onChange={(e) =>
                      updateBlockField(
                        experience,
                        setExperience,
                        job.id,
                        "company",
                        e.target.value,
                      )
                    }
                  />
                  <ul style={{ paddingLeft: "18px", margin: "6px 0" }}>
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
                              experience,
                              setExperience,
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
                              experience,
                              setExperience,
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
                    onClick={() => addBullet(experience, setExperience, job.id)}
                  >
                    + Add bullet
                  </button>
                </div>
              </div>
            ))}
            <button
              style={addBtnStyle}
              onClick={() =>
                addBlockItem(experience, setExperience, {
                  id: nextId(),
                  dateRange: "Year - Year",
                  role: "Role",
                  company: "Company / Location",
                  bullets: ["New bullet point"],
                })
              }
            >
              + Add experience
            </button>
          </section>

          <section>
            <h2
              style={{
                fontSize: "16px",
                letterSpacing: "1px",
                borderBottom: `1px solid ${BORDER}`,
                paddingBottom: "4px",
              }}
            >
              OPEN SOURCE CONTRIBUTIONS
            </h2>
            {openSource.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "6px",
                }}
              >
                <input
                  style={{ ...fieldStyle, flex: 1 }}
                  value={item}
                  onChange={(e) =>
                    updateListItem(
                      openSource,
                      setOpenSource,
                      index,
                      e.target.value,
                    )
                  }
                />
                <button
                  style={removeBtnStyle}
                  onClick={() =>
                    removeListItem(openSource, setOpenSource, index)
                  }
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              style={addBtnStyle}
              onClick={() =>
                addListItem(openSource, setOpenSource, "New contribution")
              }
            >
              + Add contribution
            </button>
          </section>
        </div>
      </div>

      <button
        style={{
          backgroundColor: TEXT_DARK,
          color: "white",
          border: "none",
          borderRadius: "6px",
          padding: "10px 20px",
          fontSize: "14px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onClick={handleSave}
      >
        Save CV
      </button>
    </div>
  );
}

/* ============================================================
   FRONT-END DEVELOPER CV DIVISION — shows all three templates
   next to their reference images
   ============================================================ */
function FrontEndCvSection(props) {
  const templates = [
    {
      key: "dark-cream",
      label: "Template 1 — Dark Navy / Cream",
      image: darkCreamTemplateImg,
      Component: FrontEndCvDarkCream,
    },
    {
      key: "dark-sidebar",
      label: "Template 2 — Full Dark Sidebar",
      image: darkSidebarTemplateImg,
      Component: FrontEndCvDarkSidebar,
    },
    {
      key: "minimal",
      label: "Template 3 — Minimal Timeline",
      image: minimalTemplateImg,
      Component: FrontEndCvMinimal,
    },
  ];

  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>
        Front-End Developer CV
      </h1>
      <p style={{ color: TEXT_MUTED, marginBottom: "32px" }}>
        Target role: Frontend Development — choose a template and fill in your
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

export default FrontEndCvSection;
export { FrontEndCvDarkCream, FrontEndCvDarkSidebar, FrontEndCvMinimal };
