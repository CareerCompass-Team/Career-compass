import { useState } from "react";

// Colors pulled from the "Nick Sanchez" template screenshot
const SAGE = "#82A88A";
const SAGE_LIGHT = "#A9C4AC";
const SAGE_TEXT = "#E6EFE8";
const TEXT_DARK = "#1F2937";
const TEXT_MUTED = "#6B7280";
const BORDER = "#E5E7EB";

let idCounter = 0;
const nextId = () => `item-${idCounter++}`;

function GeneralCv(props) {
  const { initialData, onSave } = props;

  const [personal, setPersonal] = useState(
    initialData?.personal || {
      name: "Your Name",
      email: "you@example.com",
      phone: "(000) 000-0000",
      address: "City, State",
    },
  );

  const [hardSkills, setHardSkills] = useState(
    initialData?.hardSkills || ["Add a hard skill"],
  );

  const [summary, setSummary] = useState(
    initialData?.summary ||
      "Write a short summary of your experience and what role you're targeting.",
  );

  const [workExperience, setWorkExperience] = useState(
    initialData?.workExperience || [
      {
        id: nextId(),
        title: "Job Title",
        company: "Company, Location",
        startDate: "Mon Year",
        endDate: "Present",
        bullets: ["Describe an achievement or responsibility"],
      },
    ],
  );

  const [education, setEducation] = useState(
    initialData?.education || [
      {
        id: nextId(),
        degree: "Degree",
        school: "School, Location",
        startDate: "Year",
        endDate: "Year",
        bullets: ["Relevant coursework or project"],
      },
    ],
  );

  const [softSkills, setSoftSkills] = useState(
    initialData?.softSkills || ["Teamwork", "Communication"],
  );

  const [certifications, setCertifications] = useState(
    initialData?.certifications || [
      { id: nextId(), date: "Mon Year", name: "Certification name" },
    ],
  );

  const handlePersonalChange = (field, value) => {
    setPersonal({ ...personal, [field]: value });
  };

  const handleListItemChange = (list, setList, index, value) => {
    const updated = [...list];
    updated[index] = value;
    setList(updated);
  };

  const handleAddListItem = (list, setList, placeholder) => {
    setList([...list, placeholder]);
  };

  const handleRemoveListItem = (list, setList, index) => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleBlockFieldChange = (list, setList, id, field, value) => {
    setList(
      list.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleBulletChange = (list, setList, id, bulletIndex, value) => {
    setList(
      list.map((item) => {
        if (item.id !== id) return item;
        const bullets = [...item.bullets];
        bullets[bulletIndex] = value;
        return { ...item, bullets };
      }),
    );
  };

  const handleAddBullet = (list, setList, id) => {
    setList(
      list.map((item) =>
        item.id === id
          ? { ...item, bullets: [...item.bullets, "New bullet point"] }
          : item,
      ),
    );
  };

  const handleRemoveBullet = (list, setList, id, bulletIndex) => {
    setList(
      list.map((item) =>
        item.id === id
          ? {
              ...item,
              bullets: item.bullets.filter((_, i) => i !== bulletIndex),
            }
          : item,
      ),
    );
  };

  const handleAddWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        id: nextId(),
        title: "Job Title",
        company: "Company, Location",
        startDate: "Mon Year",
        endDate: "Present",
        bullets: ["Describe an achievement or responsibility"],
      },
    ]);
  };

  const handleRemoveWorkExperience = (id) => {
    setWorkExperience(workExperience.filter((item) => item.id !== id));
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        id: nextId(),
        degree: "Degree",
        school: "School, Location",
        startDate: "Year",
        endDate: "Year",
        bullets: ["Relevant coursework or project"],
      },
    ]);
  };

  const handleRemoveEducation = (id) => {
    setEducation(education.filter((item) => item.id !== id));
  };

  const handleAddCertification = () => {
    setCertifications([
      ...certifications,
      { id: nextId(), date: "Mon Year", name: "Certification name" },
    ]);
  };

  const handleRemoveCertification = (id) => {
    setCertifications(certifications.filter((item) => item.id !== id));
  };

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

  // Shared style for an editable underline-style text field
  const editableInput = {
    border: "none",
    borderBottom: "1px dashed rgba(255,255,255,0.4)",
    background: "transparent",
    color: "white",
    fontSize: "14px",
    padding: "2px 0",
    width: "100%",
    outline: "none",
  };

  const editableDarkInput = {
    border: "none",
    borderBottom: `1px dashed ${BORDER}`,
    background: "transparent",
    color: TEXT_DARK,
    fontSize: "14px",
    padding: "2px 0",
    outline: "none",
  };

  const smallRemoveButton = {
    border: "none",
    background: "transparent",
    color: "#EF4444",
    cursor: "pointer",
    fontSize: "12px",
    marginLeft: "6px",
  };

  const addButton = {
    border: `1px dashed ${BORDER}`,
    background: "white",
    color: TEXT_MUTED,
    cursor: "pointer",
    fontSize: "13px",
    padding: "6px 12px",
    borderRadius: "6px",
    marginTop: "8px",
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
      <div style={{ width: "280px", backgroundColor: SAGE, padding: "0" }}>
        <div style={{ height: "40px", backgroundColor: SAGE_LIGHT }} />

        <div style={{ padding: "24px" }}>
          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                color: SAGE_TEXT,
                fontSize: "20px",
                marginBottom: "4px",
              }}
            >
              Personal details
            </h2>
            <div
              style={{
                borderBottom: `1px solid ${SAGE_TEXT}`,
                marginBottom: "16px",
              }}
            />

            <div style={{ marginBottom: "12px" }}>
              <div
                style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}
              >
                Name
              </div>
              <input
                style={editableInput}
                value={personal.name}
                onChange={(e) => handlePersonalChange("name", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div
                style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}
              >
                Email address
              </div>
              <input
                style={editableInput}
                value={personal.email}
                onChange={(e) => handlePersonalChange("email", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div
                style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}
              >
                Phone number
              </div>
              <input
                style={editableInput}
                value={personal.phone}
                onChange={(e) => handlePersonalChange("phone", e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div
                style={{ color: "white", fontWeight: "bold", fontSize: "13px" }}
              >
                Address
              </div>
              <input
                style={editableInput}
                value={personal.address}
                onChange={(e) =>
                  handlePersonalChange("address", e.target.value)
                }
              />
            </div>
          </div>

          <div>
            <h2
              style={{
                color: SAGE_TEXT,
                fontSize: "20px",
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
                  style={editableInput}
                  value={skill}
                  onChange={(e) =>
                    handleListItemChange(
                      hardSkills,
                      setHardSkills,
                      index,
                      e.target.value,
                    )
                  }
                />
                <button
                  style={smallRemoveButton}
                  onClick={() =>
                    handleRemoveListItem(hardSkills, setHardSkills, index)
                  }
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              style={{
                ...addButton,
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() =>
                handleAddListItem(hardSkills, setHardSkills, "New skill")
              }
            >
              + Add skill
            </button>
          </div>
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
          onChange={(e) => handlePersonalChange("name", e.target.value)}
        />

        {/* Summary */}
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: TEXT_DARK }}>Summary</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />
          <textarea
            style={{
              ...editableDarkInput,
              borderBottom: "none",
              width: "100%",
              resize: "vertical",
            }}
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </section>

        {/* Work Experience */}
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
            <div key={job.id} style={{ display: "flex", marginBottom: "16px" }}>
              <div
                style={{
                  width: "140px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: TEXT_DARK,
                }}
              >
                <input
                  style={{ ...editableDarkInput, width: "60px" }}
                  value={job.startDate}
                  onChange={(e) =>
                    handleBlockFieldChange(
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
                  style={{ ...editableDarkInput, width: "60px" }}
                  value={job.endDate}
                  onChange={(e) =>
                    handleBlockFieldChange(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "endDate",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div style={{ flex: 1 }}>
                <input
                  style={{
                    ...editableDarkInput,
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  value={job.title}
                  onChange={(e) =>
                    handleBlockFieldChange(
                      workExperience,
                      setWorkExperience,
                      job.id,
                      "title",
                      e.target.value,
                    )
                  }
                />
                <input
                  style={{
                    ...editableDarkInput,
                    color: SAGE,
                    fontWeight: "bold",
                  }}
                  value={job.company}
                  onChange={(e) =>
                    handleBlockFieldChange(
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
                        style={{ ...editableDarkInput, flex: 1 }}
                        value={bullet}
                        onChange={(e) =>
                          handleBulletChange(
                            workExperience,
                            setWorkExperience,
                            job.id,
                            bulletIndex,
                            e.target.value,
                          )
                        }
                      />
                      <button
                        style={smallRemoveButton}
                        onClick={() =>
                          handleRemoveBullet(
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
                  style={addButton}
                  onClick={() =>
                    handleAddBullet(workExperience, setWorkExperience, job.id)
                  }
                >
                  + Add bullet
                </button>
                <button
                  style={{ ...addButton, marginLeft: "8px", color: "#EF4444" }}
                  onClick={() => handleRemoveWorkExperience(job.id)}
                >
                  Remove role
                </button>
              </div>
            </div>
          ))}
          <button style={addButton} onClick={handleAddWorkExperience}>
            + Add work experience
          </button>
        </section>

        {/* Education */}
        <section style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "22px", color: TEXT_DARK }}>Education</h2>
          <div
            style={{
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: "10px",
            }}
          />

          {education.map((edu) => (
            <div key={edu.id} style={{ display: "flex", marginBottom: "16px" }}>
              <div
                style={{
                  width: "140px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: TEXT_DARK,
                }}
              >
                <input
                  style={{ ...editableDarkInput, width: "60px" }}
                  value={edu.startDate}
                  onChange={(e) =>
                    handleBlockFieldChange(
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
                  style={{ ...editableDarkInput, width: "60px" }}
                  value={edu.endDate}
                  onChange={(e) =>
                    handleBlockFieldChange(
                      education,
                      setEducation,
                      edu.id,
                      "endDate",
                      e.target.value,
                    )
                  }
                />
              </div>

              <div style={{ flex: 1 }}>
                <input
                  style={{
                    ...editableDarkInput,
                    fontWeight: "bold",
                    fontSize: "15px",
                  }}
                  value={edu.degree}
                  onChange={(e) =>
                    handleBlockFieldChange(
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
                    ...editableDarkInput,
                    color: SAGE,
                    fontWeight: "bold",
                  }}
                  value={edu.school}
                  onChange={(e) =>
                    handleBlockFieldChange(
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
                        style={{ ...editableDarkInput, flex: 1 }}
                        value={bullet}
                        onChange={(e) =>
                          handleBulletChange(
                            education,
                            setEducation,
                            edu.id,
                            bulletIndex,
                            e.target.value,
                          )
                        }
                      />
                      <button
                        style={smallRemoveButton}
                        onClick={() =>
                          handleRemoveBullet(
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
                <button
                  style={addButton}
                  onClick={() =>
                    handleAddBullet(education, setEducation, edu.id)
                  }
                >
                  + Add bullet
                </button>
                <button
                  style={{ ...addButton, marginLeft: "8px", color: "#EF4444" }}
                  onClick={() => handleRemoveEducation(edu.id)}
                >
                  Remove entry
                </button>
              </div>
            </div>
          ))}
          <button style={addButton} onClick={handleAddEducation}>
            + Add education
          </button>
        </section>

        {/* Soft Skills */}
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
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", width: "45%" }}
              >
                <input
                  style={{ ...editableDarkInput, fontWeight: "bold" }}
                  value={skill}
                  onChange={(e) =>
                    handleListItemChange(
                      softSkills,
                      setSoftSkills,
                      index,
                      e.target.value,
                    )
                  }
                />
                <button
                  style={smallRemoveButton}
                  onClick={() =>
                    handleRemoveListItem(softSkills, setSoftSkills, index)
                  }
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            style={addButton}
            onClick={() =>
              handleAddListItem(softSkills, setSoftSkills, "New soft skill")
            }
          >
            + Add soft skill
          </button>
        </section>

        {/* Certifications */}
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
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <input
                style={{
                  ...editableDarkInput,
                  width: "100px",
                  fontWeight: "bold",
                }}
                value={cert.date}
                onChange={(e) =>
                  handleBlockFieldChange(
                    certifications,
                    setCertifications,
                    cert.id,
                    "date",
                    e.target.value,
                  )
                }
              />
              <input
                style={{
                  ...editableDarkInput,
                  flex: 1,
                  fontWeight: "bold",
                  marginLeft: "16px",
                }}
                value={cert.name}
                onChange={(e) =>
                  handleBlockFieldChange(
                    certifications,
                    setCertifications,
                    cert.id,
                    "name",
                    e.target.value,
                  )
                }
              />
              <button
                style={smallRemoveButton}
                onClick={() => handleRemoveCertification(cert.id)}
              >
                ✕
              </button>
            </div>
          ))}
          <button style={addButton} onClick={handleAddCertification}>
            + Add certification
          </button>
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

export default GeneralCv;
