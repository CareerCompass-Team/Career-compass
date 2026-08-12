import { useState } from "react";

// Reference screenshots — save the three Full Stack CV example images into
// your assets folder with these names (or update the paths).
import darkTemplateImg from "../assets/FullStack Dark.jpg";
import blueTemplateImg from "../assets/FullStackBlue.webp";
import greenTemplateImg from "../assets/FullStackGreen.jpg";

// ---------- Shared colors ----------
const DARK = "#2B2B2B";
const BLUE = "#2E7BD6";
const GREEN = "#0E4B42";
const TEXT_DARK = "#1F2937";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";

let idCounter = 400;
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
   TEMPLATE 1 — Dark sidebar, bars + dot-rated languages (Image 1)
   ============================================================ */
function FullStackCvDark(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Ryan Lauren",
      title: "Full Stack Developer",
      photoUrl: "",
      email: "info@resumekraft.com",
      phone: "202-555-0120",
      location: "Chicago, Illinois, US",
      linkedin: "linkedin.com/resumekraft",
    },
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      { id: nextId(), name: "Wordpress", level: 70 },
      { id: nextId(), name: "Php", level: 65 },
      { id: nextId(), name: "Javascript", level: 80 },
      { id: nextId(), name: "React", level: 90 },
      { id: nextId(), name: "Node js", level: 85 },
    ],
  );

  const [languages, setLanguages] = useState(
    initialData?.languages || [
      { id: nextId(), name: "English", level: 5 },
      { id: nextId(), name: "French", level: 4 },
      { id: nextId(), name: "Arabic", level: 3 },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        line1: "Diploma In CSE",
        line2: "San Jose State University",
      },
      {
        id: nextId(),
        line1: "Passed 10 + 2",
        line2: "Northeastern University",
      },
    ],
  );

  const [aboutMe, setAboutMe] = useState(
    initialData?.aboutMe ||
      "Full Stack Developer with 5 years of experience in designing and implementing web applications. Proficient in frontend technologies such as HTML, CSS, JavaScript, and frameworks like Angular and React. Skilled in backend development using Java, Python, and frameworks including Spring and Django.",
  );

  const [experience, setExperience] = useState(
    initialData?.experience || [
      {
        id: nextId(),
        role: "Frontend Developer",
        company: "Royallogics Infosolution",
        dates: "Apr 2015 - Apr 2017",
        bullets: [
          "Experience creating userfriendly web pages using HTML, CSS, and JavaScript.",
        ],
      },
      {
        id: nextId(),
        role: "Fullstack Developer",
        company: "Gladhand technology",
        dates: "Apr 2017 - Nov 2020",
        bullets: [
          "Excellent communication skills to effectively communicate with stakeholders and clients.",
        ],
      },
    ],
  );

  const handleSave = () => {
    if (onSave)
      onSave({ personal, skills, languages, education, aboutMe, experience });
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
    height: "6px",
    borderRadius: "3px",
    backgroundColor: "rgba(255,255,255,0.2)",
    width: "100%",
    marginTop: "4px",
  };
  const barFillStyle = (level) => ({
    height: "6px",
    borderRadius: "3px",
    backgroundColor: "#9CA3AF",
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
          backgroundColor: DARK,
          padding: "24px",
          color: "white",
        }}
      >
        <h2 style={{ fontSize: "16px", letterSpacing: "1px" }}>CONTACT</h2>
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
          style={{ fontSize: "16px", letterSpacing: "1px", marginTop: "16px" }}
        >
          SKILLS
        </h2>
        {skills.map((skill) => (
          <div key={skill.id} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ ...sidebarFieldStyle, fontSize: "13px" }}
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
          style={{ fontSize: "16px", letterSpacing: "1px", marginTop: "16px" }}
        >
          LANGUAGES
        </h2>
        {languages.map((lang) => (
          <div
            key={lang.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "8px",
            }}
          >
            <input
              style={{ ...sidebarFieldStyle, fontSize: "13px", width: "50%" }}
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
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    backgroundColor:
                      dot <= lang.level ? "#9CA3AF" : "rgba(255,255,255,0.2)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        ))}

        <h2
          style={{ fontSize: "16px", letterSpacing: "1px", marginTop: "16px" }}
        >
          EDUCATION
        </h2>
        {education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
            <input
              style={{ ...sidebarFieldStyle, fontWeight: "bold" }}
              value={edu.line1}
              onChange={(e) =>
                updateBlockField(
                  education,
                  setEducation,
                  edu.id,
                  "line1",
                  e.target.value,
                )
              }
            />
            <input
              style={sidebarFieldStyle}
              value={edu.line2}
              onChange={(e) =>
                updateBlockField(
                  education,
                  setEducation,
                  edu.id,
                  "line2",
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
          style={{
            ...addBtnStyle,
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() =>
            addBlockItem(education, setEducation, {
              id: nextId(),
              line1: "Qualification",
              line2: "School",
            })
          }
        >
          + Add education
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
                fontSize: "30px",
                fontWeight: "bold",
                border: "none",
                outline: "none",
              }}
              value={personal.name}
              onChange={(e) => updateField(setPersonal, "name", e.target.value)}
            />
            <input
              style={{
                ...fieldStyle,
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              value={personal.title}
              onChange={(e) =>
                updateField(setPersonal, "title", e.target.value)
              }
            />
          </div>
          <div>
            <img
              src={personal.photoUrl || "https://via.placeholder.com/90"}
              alt="Profile"
              style={{ width: "80px", height: "80px", objectFit: "cover" }}
            />
            <input
              style={{ ...fieldStyle, fontSize: "11px" }}
              placeholder="Photo URL"
              value={personal.photoUrl}
              onChange={(e) =>
                updateField(setPersonal, "photoUrl", e.target.value)
              }
            />
          </div>
        </div>

        <section style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "18px",
              color: TEXT_MUTED,
              letterSpacing: "1px",
            }}
          >
            ABOUT ME
          </h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          <textarea
            style={{ ...fieldStyle, borderBottom: "none", resize: "vertical" }}
            rows={4}
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
          />
        </section>

        <section style={{ marginBottom: "16px" }}>
          <h2
            style={{
              fontSize: "18px",
              color: TEXT_MUTED,
              letterSpacing: "1px",
            }}
          >
            EXPERIENCE
          </h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          {experience.map((job) => (
            <div key={job.id} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <input
                  style={{ ...fieldStyle, fontWeight: "bold", width: "60%" }}
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
                  style={{ ...fieldStyle, width: "35%" }}
                  value={job.dates}
                  onChange={(e) =>
                    updateBlockField(
                      experience,
                      setExperience,
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
                    experience,
                    setExperience,
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
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(experience, setExperience, {
                id: nextId(),
                role: "Role",
                company: "Company",
                dates: "Mon Year - Present",
                bullets: ["New bullet point"],
              })
            }
          >
            + Add experience
          </button>
        </section>

        <button
          style={{
            backgroundColor: DARK,
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
   TEMPLATE 2 — Blue badge headers, diamond ratings (Image 2)
   ============================================================ */
function FullStackCvBlue(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "David Gardner",
      title: "Junior Full Stack Developer",
      photoUrl: "",
      phone: "+1 234 567 89 10",
      email: "davidgardner@gmail.com",
      location: "Austin, TX",
    },
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Aspiring Full Stack Developer with a strong foundation in web development and a Bachelor's degree in Computer Science. Eager to leverage academic training and hands-on project experience.",
  );

  const [projects, setProjects] = useState(
    initialData?.projects || [
      {
        id: nextId(),
        title: "E-commerce Website",
        dates: "2023 - 2024",
        subtitle: "Senior Project, The University of Texas at Austin",
        bullets: [
          "Developed a full-stack e-commerce website using MERN stack (MongoDB, Express.js, React, Node.js).",
        ],
      },
    ],
  );

  const [internships, setInternships] = useState(
    initialData?.internships || [
      {
        id: nextId(),
        title: "Software Development Intern",
        dates: "June 2023 - August 2023",
        subtitle: "FusionGrid IT, Austin, TX",
        bullets: [
          "Assisted senior developers in building and maintaining web applications using React and Node.js.",
        ],
      },
    ],
  );

  const [links, setLinks] = useState(
    initialData?.links || [
      { id: nextId(), label: "GitHub", value: "david.gardner" },
      { id: nextId(), label: "LinkedIn", value: "davidgardner" },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Bachelor of Science in Computer Science",
        dates: "2020 - 2024",
        school: "The University of Texas at Austin",
      },
    ],
  );

  const [languages, setLanguages] = useState(
    initialData?.languages || ["HTML", "CSS", "JavaScript"],
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      {
        id: nextId(),
        category: "Front-End",
        items: "React, Angular, Bootstrap",
        level: 5,
      },
      {
        id: nextId(),
        category: "Back-End",
        items: "Node.js, Express.js, Flask",
        level: 4,
      },
      {
        id: nextId(),
        category: "Databases",
        items: "MongoDB, MySQL",
        level: 4,
      },
    ],
  );

  const handleSave = () => {
    if (onSave)
      onSave({
        personal,
        summary,
        projects,
        internships,
        links,
        education,
        languages,
        skills,
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

  const badgeStyle = {
    backgroundColor: BLUE,
    color: "white",
    fontSize: "12px",
    fontWeight: "bold",
    padding: "4px 10px",
    display: "inline-block",
    marginBottom: "8px",
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
      {/* Left main column */}
      <div style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            marginBottom: "12px",
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
              style={{ ...fieldStyle, fontSize: "11px" }}
              placeholder="Photo URL"
              value={personal.photoUrl}
              onChange={(e) =>
                updateField(setPersonal, "photoUrl", e.target.value)
              }
            />
          </div>
          <div>
            <input
              style={{ ...fieldStyle, color: BLUE, fontWeight: "bold" }}
              value={personal.title}
              onChange={(e) =>
                updateField(setPersonal, "title", e.target.value)
              }
            />
            <input
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                border: "none",
                outline: "none",
              }}
              value={personal.name}
              onChange={(e) => updateField(setPersonal, "name", e.target.value)}
            />
          </div>
        </div>
        <div
          style={{ height: "6px", backgroundColor: BLUE, marginBottom: "16px" }}
        />

        <div style={badgeStyle}>Professional summary</div>
        <textarea
          style={{ ...fieldStyle, borderBottom: "none", resize: "vertical" }}
          rows={3}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <div style={{ ...badgeStyle, marginTop: "20px" }}>Projects</div>
        {projects.map((project) => (
          <div key={project.id} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                style={{
                  ...fieldStyle,
                  fontWeight: "bold",
                  fontSize: "16px",
                  width: "60%",
                }}
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
                style={{ ...fieldStyle, color: TEXT_MUTED, width: "35%" }}
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
            <input
              style={{ ...fieldStyle, color: TEXT_MUTED }}
              value={project.subtitle}
              onChange={(e) =>
                updateBlockField(
                  projects,
                  setProjects,
                  project.id,
                  "subtitle",
                  e.target.value,
                )
              }
            />
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
          </div>
        ))}
        <button
          style={addBtnStyle}
          onClick={() =>
            addBlockItem(projects, setProjects, {
              id: nextId(),
              title: "Project name",
              dates: "Year - Year",
              subtitle: "Context",
              bullets: ["New bullet point"],
            })
          }
        >
          + Add project
        </button>

        <div style={{ ...badgeStyle, marginTop: "20px" }}>Internships</div>
        {internships.map((intern) => (
          <div key={intern.id} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <input
                style={{
                  ...fieldStyle,
                  fontWeight: "bold",
                  fontSize: "16px",
                  width: "60%",
                }}
                value={intern.title}
                onChange={(e) =>
                  updateBlockField(
                    internships,
                    setInternships,
                    intern.id,
                    "title",
                    e.target.value,
                  )
                }
              />
              <input
                style={{ ...fieldStyle, color: TEXT_MUTED, width: "35%" }}
                value={intern.dates}
                onChange={(e) =>
                  updateBlockField(
                    internships,
                    setInternships,
                    intern.id,
                    "dates",
                    e.target.value,
                  )
                }
              />
            </div>
            <input
              style={{ ...fieldStyle, color: TEXT_MUTED }}
              value={intern.subtitle}
              onChange={(e) =>
                updateBlockField(
                  internships,
                  setInternships,
                  intern.id,
                  "subtitle",
                  e.target.value,
                )
              }
            />
            <ul style={{ paddingLeft: "18px", margin: "6px 0" }}>
              {intern.bullets.map((bullet, bulletIndex) => (
                <li
                  key={bulletIndex}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    style={{ ...fieldStyle, flex: 1 }}
                    value={bullet}
                    onChange={(e) =>
                      updateBullet(
                        internships,
                        setInternships,
                        intern.id,
                        bulletIndex,
                        e.target.value,
                      )
                    }
                  />
                  <button
                    style={removeBtnStyle}
                    onClick={() =>
                      removeBullet(
                        internships,
                        setInternships,
                        intern.id,
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
              onClick={() => addBullet(internships, setInternships, intern.id)}
            >
              + Add bullet
            </button>
          </div>
        ))}
        <button
          style={addBtnStyle}
          onClick={() =>
            addBlockItem(internships, setInternships, {
              id: nextId(),
              title: "Internship title",
              dates: "Mon Year - Mon Year",
              subtitle: "Company, Location",
              bullets: ["New bullet point"],
            })
          }
        >
          + Add internship
        </button>

        <button
          style={{
            backgroundColor: BLUE,
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "10px 20px",
            fontSize: "14px",
            cursor: "pointer",
            marginTop: "16px",
          }}
          onClick={handleSave}
        >
          Save CV
        </button>
      </div>

      {/* Right column */}
      <div
        style={{
          width: "260px",
          padding: "24px",
          backgroundColor: "white",
          borderLeft: `1px solid ${BORDER}`,
        }}
      >
        {["phone", "email", "location"].map((field) => (
          <div key={field} style={{ marginBottom: "8px" }}>
            <input
              style={fieldStyle}
              value={personal[field]}
              onChange={(e) => updateField(setPersonal, field, e.target.value)}
            />
          </div>
        ))}

        <div style={{ ...badgeStyle, marginTop: "16px" }}>Links</div>
        {links.map((link) => (
          <div
            key={link.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "6px",
            }}
          >
            <input
              style={{ ...fieldStyle, fontWeight: "bold", width: "40%" }}
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
              style={fieldStyle}
              value={link.value}
              onChange={(e) =>
                updateBlockField(
                  links,
                  setLinks,
                  link.id,
                  "value",
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
          style={addBtnStyle}
          onClick={() =>
            addBlockItem(links, setLinks, {
              id: nextId(),
              label: "Label",
              value: "value",
            })
          }
        >
          + Add link
        </button>

        <div style={{ ...badgeStyle, marginTop: "16px" }}>Education</div>
        {education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "10px" }}>
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
              value={edu.dates}
              onChange={(e) =>
                updateBlockField(
                  education,
                  setEducation,
                  edu.id,
                  "dates",
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
          </div>
        ))}

        <div style={{ ...badgeStyle, marginTop: "16px" }}>Languages</div>
        {languages.map((lang, index) => (
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
              value={lang}
              onChange={(e) =>
                updateListItem(languages, setLanguages, index, e.target.value)
              }
            />
            <button
              style={removeBtnStyle}
              onClick={() => removeListItem(languages, setLanguages, index)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          style={addBtnStyle}
          onClick={() => addListItem(languages, setLanguages, "New language")}
        >
          + Add
        </button>

        <div style={{ ...badgeStyle, marginTop: "16px" }}>Skills</div>
        {skills.map((skill) => (
          <div key={skill.id} style={{ marginBottom: "10px" }}>
            <input
              style={{ ...fieldStyle, fontWeight: "bold" }}
              value={skill.category}
              onChange={(e) =>
                updateBlockField(
                  skills,
                  setSkills,
                  skill.id,
                  "category",
                  e.target.value,
                )
              }
            />
            <input
              style={fieldStyle}
              value={skill.items}
              onChange={(e) =>
                updateBlockField(
                  skills,
                  setSkills,
                  skill.id,
                  "items",
                  e.target.value,
                )
              }
            />
            <div style={{ display: "flex", gap: "3px", marginTop: "4px" }}>
              {[1, 2, 3, 4, 5].map((dot) => (
                <span
                  key={dot}
                  onClick={() =>
                    updateBlockField(skills, setSkills, skill.id, "level", dot)
                  }
                  style={{
                    width: "10px",
                    height: "10px",
                    transform: "rotate(45deg)",
                    backgroundColor: dot <= skill.level ? BLUE : BORDER,
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
        <button
          style={addBtnStyle}
          onClick={() =>
            addBlockItem(skills, setSkills, {
              id: nextId(),
              category: "Category",
              items: "Items",
              level: 3,
            })
          }
        >
          + Add skill
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   TEMPLATE 3 — Green serif sidebar (Image 3)
   ============================================================ */
function FullStackCvGreen(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Ingrid Bucur",
      title: "Full Stack Developer",
      address: "37 Englewood Drive",
      city: "Boston, MA 02108",
      phone: "617-234-9090",
      email: "bucur_ingrd9@gmail.com",
      photoUrl: "",
    },
  );

  const [skills, setSkills] = useState(
    initialData?.skills || [
      "Software Development",
      "SQL, React.js, Node.js",
      "Complex Problem Solving",
      "Design and Development of APIs",
    ],
  );

  const [languages, setLanguages] = useState(
    initialData?.languages || [
      { id: nextId(), name: "Romanian", level: 100 },
      { id: nextId(), name: "English", level: 90 },
      { id: nextId(), name: "German", level: 85 },
    ],
  );

  const [profile, setProfile] = useState(
    initialData?.profile ||
      "Full Stack Developer adept in working in both front-end and back-end development processes. Highly skilled in programming design, development, and implementation of functional specifications.",
  );

  const [employmentHistory, setEmploymentHistory] = useState(
    initialData?.employmentHistory || [
      {
        id: nextId(),
        role: "Full Stack Developer",
        company: "Excel Technology Group, Boston",
        dates: "October 2018 — September 2022",
        bullets: [
          "Performed coding, debugging, and unit testing tasks in support of projects.",
        ],
      },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree:
          "Master of Science in Computer Science, Boston University, Boston",
        dates: "September 2010 — May 2013",
      },
    ],
  );

  const [certifications, setCertifications] = useState(
    initialData?.certifications || [
      {
        id: nextId(),
        name: "Full Stack Developer Professional Certificate",
        year: "2011",
      },
    ],
  );

  const handleSave = () => {
    if (onSave)
      onSave({
        personal,
        skills,
        languages,
        profile,
        employmentHistory,
        education,
        certifications,
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
    fontFamily: "Georgia, serif",
  };

  const sidebarFieldStyle = {
    ...fieldStyle,
    color: "white",
    borderBottom: "1px dashed rgba(255,255,255,0.3)",
  };
  const barStyle = {
    height: "5px",
    backgroundColor: "rgba(255,255,255,0.25)",
    width: "100%",
    marginTop: "4px",
  };
  const barFillStyle = (level) => ({
    height: "5px",
    backgroundColor: "white",
    width: `${level}%`,
  });

  return (
    <div
      style={{
        display: "flex",
        maxWidth: "900px",
        margin: "0 auto",
        fontFamily: "Georgia, serif",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      {/* Left green sidebar */}
      <div
        style={{
          width: "260px",
          backgroundColor: GREEN,
          padding: "24px",
          color: "white",
        }}
      >
        <img
          src={personal.photoUrl || "https://via.placeholder.com/80"}
          alt="Profile"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid white",
          }}
        />
        <input
          style={{ ...sidebarFieldStyle, fontSize: "11px" }}
          placeholder="Photo URL"
          value={personal.photoUrl}
          onChange={(e) => updateField(setPersonal, "photoUrl", e.target.value)}
        />

        <input
          style={{
            ...sidebarFieldStyle,
            fontSize: "22px",
            fontWeight: "bold",
            marginTop: "12px",
          }}
          value={personal.name}
          onChange={(e) => updateField(setPersonal, "name", e.target.value)}
        />
        <input
          style={{
            ...sidebarFieldStyle,
            fontSize: "12px",
            letterSpacing: "1px",
          }}
          value={personal.title}
          onChange={(e) => updateField(setPersonal, "title", e.target.value)}
        />

        <h2 style={{ fontSize: "16px", marginTop: "20px" }}>Details</h2>
        {["address", "city", "phone", "email"].map((field) => (
          <input
            key={field}
            style={{ ...sidebarFieldStyle, fontSize: "13px" }}
            value={personal[field]}
            onChange={(e) => updateField(setPersonal, field, e.target.value)}
          />
        ))}

        <h2 style={{ fontSize: "16px", marginTop: "20px" }}>Skills</h2>
        {skills.map((skill, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                style={{ ...sidebarFieldStyle, fontSize: "13px" }}
                value={skill}
                onChange={(e) =>
                  updateListItem(skills, setSkills, index, e.target.value)
                }
              />
              <button
                style={removeBtnStyle}
                onClick={() => removeListItem(skills, setSkills, index)}
              >
                ✕
              </button>
            </div>
            <div style={barStyle}>
              <div style={barFillStyle(100)} />
            </div>
          </div>
        ))}
        <button
          style={{
            ...addBtnStyle,
            backgroundColor: "transparent",
            color: "white",
          }}
          onClick={() => addListItem(skills, setSkills, "New skill")}
        >
          + Add skill
        </button>

        <h2 style={{ fontSize: "16px", marginTop: "20px" }}>Languages</h2>
        {languages.map((lang) => (
          <div key={lang.id} style={{ marginBottom: "10px" }}>
            <input
              style={{ ...sidebarFieldStyle, fontSize: "13px" }}
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
      <div style={{ flex: 1, padding: "24px 32px", backgroundColor: "white" }}>
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px" }}>Profile</h2>
          <textarea
            style={{ ...fieldStyle, borderBottom: "none", resize: "vertical" }}
            rows={3}
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
          />
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px" }}>Employment History</h2>
          {employmentHistory.map((job) => (
            <div
              key={job.id}
              style={{ marginTop: "12px", marginBottom: "12px" }}
            >
              <input
                style={{ ...fieldStyle, fontWeight: "bold", fontSize: "16px" }}
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
              <input
                style={{
                  ...fieldStyle,
                  color: TEXT_MUTED,
                  textTransform: "uppercase",
                  fontSize: "12px",
                }}
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
                company: "Company, Location",
                dates: "Month Year — Month Year",
                bullets: ["New bullet point"],
              })
            }
          >
            + Add role
          </button>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px" }}>Education</h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ marginBottom: "10px" }}>
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
                style={{
                  ...fieldStyle,
                  color: TEXT_MUTED,
                  textTransform: "uppercase",
                  fontSize: "12px",
                }}
                value={edu.dates}
                onChange={(e) =>
                  updateBlockField(
                    education,
                    setEducation,
                    edu.id,
                    "dates",
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
                degree: "Degree, School",
                dates: "Month Year — Month Year",
              })
            }
          >
            + Add education
          </button>
        </section>

        <section style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "22px" }}>Certifications</h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: "8px" }}>
              <input
                style={{ ...fieldStyle, fontWeight: "bold" }}
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
                style={{ ...fieldStyle, color: TEXT_MUTED, fontSize: "12px" }}
                value={cert.year}
                onChange={(e) =>
                  updateBlockField(
                    certifications,
                    setCertifications,
                    cert.id,
                    "year",
                    e.target.value,
                  )
                }
              />
            </div>
          ))}
          <button
            style={addBtnStyle}
            onClick={() =>
              addBlockItem(certifications, setCertifications, {
                id: nextId(),
                name: "Certification name",
                year: "Year",
              })
            }
          >
            + Add certification
          </button>
        </section>

        <button
          style={{
            backgroundColor: GREEN,
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
   FULL STACK DEVELOPER CV DIVISION — shows all three templates
   next to their reference images
   ============================================================ */
function FullStackCvSection(props) {
  const templates = [
    {
      key: "dark",
      label: "Template 1 — Dark Sidebar",
      image: darkTemplateImg,
      Component: FullStackCvDark,
    },
    {
      key: "blue",
      label: "Template 2 — Blue Badge Style",
      image: blueTemplateImg,
      Component: FullStackCvBlue,
    },
    {
      key: "green",
      label: "Template 3 — Green Serif Sidebar",
      image: greenTemplateImg,
      Component: FullStackCvGreen,
    },
  ];

  return (
    <div style={{ padding: "32px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "4px" }}>
        Full Stack Developer CV
      </h1>
      <p style={{ color: TEXT_MUTED, marginBottom: "32px" }}>
        Target role: Full Stack Development — choose a template and fill in your
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

export default FullStackCvSection;
export { FullStackCvDark, FullStackCvBlue, FullStackCvGreen };
