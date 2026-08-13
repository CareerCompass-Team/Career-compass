function RecruiterForm({ onDone }) {
  const submitJob = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const newJob = {
      id: Date.now(),
      title: data.get("title"),
      company: data.get("company"),
      location: data.get("location"),
      type: data.get("type"),
      description: data.get("description"),
      apply: data.get("apply"),
    };

    const jobs = JSON.parse(localStorage.getItem("postedJobs")) || [];

    localStorage.setItem("postedJobs", JSON.stringify([...jobs, newJob]));

    onDone(newJob);
  };

  const s = {
    display: "block",
    width: "100%",
    padding: "13px",
    marginBottom: "16px",
    boxSizing: "border-box",
    border: "1px solid #d8dce8",
    borderRadius: "8px",
  };

  const b = {
    width: "100%",
    padding: "13px",
    marginTop: "5px",
    border: 0,
    borderRadius: "8px",
    background: "#172554",
    color: "white",
    fontWeight: "600",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fc",
        padding: "50px",
        color: "#172554",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Post a Job</h1>

      <form
        onSubmit={submitJob}
        style={{
          maxWidth: "600px",
          margin: "30px auto",
          padding: "35px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 15px #17255415",
        }}
      >
        <input name="title" placeholder="Job title" style={s} />
        <input name="company" placeholder="Company" style={s} />
        <input name="location" placeholder="Location" style={s} />
        <input name="type" placeholder="Job type" style={s} />

        <textarea
          name="description"
          placeholder="Job description"
          style={{ ...s, height: "120px" }}
        />

        <input name="apply" placeholder="How to apply" style={s} />

        <button type="submit" style={b}>
          Post Job
        </button>
      </form>
    </div>
  );
}

export default RecruiterForm;
