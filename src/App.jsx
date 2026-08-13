import { useState } from "react";
import "./App.css";
import JobCard from "./components/JobCard";
import SearchBar from "./components/SearchBar";
import jobs from "./data/jobs";

function App() {
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
    <div>
      <h1>CareerCompass</h1>
      <h2>Discover Jobs</h2>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        location={location}
        setLocation={setLocation}
        jobType={jobType}
        setJobType={setJobType}
      />

      <div>
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
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

export default App;
