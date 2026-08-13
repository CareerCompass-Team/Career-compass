function UpcomingInterviews({ interviews = [] }) {
  return (
    <section className="upcoming-interviews">
      <h2>Upcoming Interviews</h2>
      <p>Don't miss your next opportunity.</p>

      {interviews.length === 0 ? (
        <p>No upcoming interviews yet.</p>
      ) : (
        interviews.map((interview) => (
          <div className="interview-card" key={interview.id}>
            <strong>{interview.date}</strong>
            <h3>{interview.jobTitle}</h3>
            <p>
              {interview.company} • {interview.type}
            </p>
            <span>{interview.time}</span>
          </div>
        ))
      )}
    </section>
  );
}

export default UpcomingInterviews;
 