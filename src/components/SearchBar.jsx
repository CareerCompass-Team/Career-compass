function SearchBar({
  searchTerm,
  setSearchTerm,
  location,
  setLocation,
  jobType,
  setJobType,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for jobs"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button>Search</button>

      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="">All locations</option>
        <option value="Nairobi, Kenya">Nairobi, Kenya</option>
        <option value="Remote">Remote</option>
      </select>

      <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
        <option value="">All job types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Internship">Internship</option>
      </select>
    </div>
  );
}

export default SearchBar;
