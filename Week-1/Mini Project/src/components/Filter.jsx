function Filter({ category, setCategory }) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="filter"
    >
      <option value="All">All Categories</option>
      <option value="React">React</option>
      <option value="JavaScript">JavaScript</option>
      <option value="CSS">CSS</option>
      <option value="Web Development">Web Development</option>
    </select>
  );
}

export default Filter;