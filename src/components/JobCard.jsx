function JobCard({ title, company, location, type }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{company}</p>
      <p>{location}</p>
      <p>{type}</p>
    </div>
  );
}

export default JobCard;
