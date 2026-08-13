import { useState } from "react";
import LandingPage from "./LandingPage";
import RecruiterForm from "./RecruiterForm";
import Sidebar from "./Sidebar";
import OverviewCards from "./OverviewCards";
import RecentApplications from "./RecentApplications";
import UpcomingInterviews from "./UpcomingInterviews";
import "./index.css";

function Dashboard() {
  const [page, setPage] = useState("landing");
  const [postedJobs, setPostedJobs] = useState(
    JSON.parse(localStorage.getItem("postedJobs")) || [],
  );

  if (page === "landing") {
    return (
      <LandingPage
        onLogin={(role) => setPage(role === "recruiter" ? "form" : "dashboard")}
      />
    );
  }

  if (page === "form") {
    return (
      <RecruiterForm
        onDone={(job) => {
          setPostedJobs((jobs) => [...jobs, job]);
          setPage("dashboard");
        }}
      />
    );
  }

  return (
    <div className="dashboard">
      <Sidebar />

      <main>
        <h1>Good morning, {localStorage.getItem("userName") || "there"} 👋</h1>

        <p>Here's what's happening with your career.</p>

        <OverviewCards />
        <h2>Posted Jobs</h2>

        {postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          postedJobs.map((job) => (
            <div className="job-card" key={job.id}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.type}</p>
              <p>{job.description}</p>
            </div>
          ))
        )}

        <div className="dashboard-grid">
          <UpcomingInterviews interviews={[]} />

          <section className="job-posts">
            <h2>Posted Jobs</h2>

            {postedJobs.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              postedJobs.map((job, index) => (
                <div className="job-card" key={index}>
                  <h3>{job.title}</h3>
                  <p>{job.company}</p>
                  <p>{job.location}</p>
                  <p>{job.type}</p>
                </div>
              ))
            )}
          </section>
        </div>

        <div className="dashboard-grid">
          <RecentApplications />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
