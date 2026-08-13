import { useState, useEffect } from "react";

function RecentApplications() {
  const [applications, setApplications] = useState(
    JSON.parse(localStorage.getItem("applications")) || [],
  );

  useEffect(() => {
    const updateApplications = () => {
      setApplications(JSON.parse(localStorage.getItem("applications")) || []);
    };

    window.addEventListener("applicationsUpdated", updateApplications);

    return () =>
      window.removeEventListener("applicationsUpdated", updateApplications);
  }, []);

  return (
    <section>
      <h2>Recent Applications</h2>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        applications.map((application) => (
          <div key={application.id}>
            <strong>{application.title}</strong>
            <p>{application.company}</p>
            <span>Applied</span>
          </div>
        ))
      )}
    </section>
  );
}

export default RecentApplications;
