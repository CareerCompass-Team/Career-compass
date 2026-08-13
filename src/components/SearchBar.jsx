function SearchBar({ searchTerm, setSearchTerm, location, setLocation }) {
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
    </div>
  );
}

export default SearchBar;
