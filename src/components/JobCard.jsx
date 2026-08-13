import { Link } from "react-router-dom";

function JobCard({ id, title, company, location, type }) {
  return (
    <Link to={`/jobs/${id}`}>
      <div>
        <h3>{title}</h3>
        <p>{company}</p>
        <p>{location}</p>
        <p>{type}</p>
      </div>
    </Link>
  );
}

export default JobCard;
