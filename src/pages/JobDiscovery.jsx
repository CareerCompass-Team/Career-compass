import { useState } from "react";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import jobs from "../data/jobs";

function JobDiscovery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (location === "" || job.location === location) &&
      (jobType === "" || job.type === jobType),
  );

  return (
    <div className="job-discovery">
      <h1>Discover Jobs</h1>
      <p>Find opportunities that match your career goals.</p>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
      />

      <div className="job-list">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            company={job.company}
            location={job.location}
            type={job.type}
          />
        ))}
      </div>
    </div>
  );
}

export default JobDiscovery;
