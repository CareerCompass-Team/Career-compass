import { useState } from "react";
import { useParams } from "react-router-dom";
import jobs from "../data/jobs";

function JobDetails() {
  const { id } = useParams();
  const [saved, setSaved] = useState(false);
  const job = jobs.find((job) => job.id === Number(id));

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.type}</p>

      <button>Apply</button>
      <button onClick={() => setSaved(!saved)}>
        {saved ? "Saved" : "Save Job"}
      </button>
    </div>
  );
}

export default JobDetails;
