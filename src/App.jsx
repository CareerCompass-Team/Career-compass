import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import JobCard from "./components/JobCard";
import SearchBar from "./components/SearchBar";
import jobs from "./data/jobs";
import JobDetails from "./components/JobDetails";

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
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
                    id={job.id}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    type={job.type}
                  />
                ))}
              </div>
            </div>
          }
        />

        <Route path="/jobs/:id" element={<JobDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
