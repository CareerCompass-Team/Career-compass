import "./App.css";
import JobCard from "./components/JobCard";
import SearchBar from "./components/SearchBar";
import jobs from "./data/jobs";

function App() {
  return (
    <div>
      <h1>CareerCompass</h1>
      <h2>Discover Jobs</h2>

      <SearchBar />

      <div>
        {jobs.map((job) => (
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
