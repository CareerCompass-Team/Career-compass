import { useState } from "react";

function LandingPage({ onLogin }) {
  const [role, setRole] = useState("jobSeeker");
  
  return (
    <div className="landing">
      <h1>CareerCompass</h1>
      <p>Find. Grow. Go.</p>

      <button onClick={() => setRole("jobSeeker")}>
        Student / Intern / Job Seeker
      </button>
      <button onClick={() => setRole("recruiter")}>Recruiter</button>

      <h2>{role === "jobSeeker" ? "Job Seeker Login" : "Recruiter Login"}</h2>
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button onClick={() => onLogin(role)}>Login</button>
    </div>
  );
}

export default LandingPage;
