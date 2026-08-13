function OverviewCards() {
  const cards = [
    ["Applications", 0, "#5B4BDB"],
    ["Interviews", 0, "#4F7DF7"],
    ["Pending", 0, "#E3A13B"],
    ["Offers", 0, "#45A66B"],
  ];

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "15px",
      }}
    >
      {cards.map(([title, value, color]) => (
        <div
          key={title}
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            border: "1px solid #eee",
          }}
        >
          <p>{title}</p>
          <h2 style={{ color }}>{value}</h2>
        </div>
      ))}
    </section>
  );
}

export default OverviewCards;
