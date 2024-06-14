const handleSortChange = (key) => {
  console.log("clicked: ", key);
  setSortConfig((prevSortConfig) => {
    console.log("prevSortConfig: ", prevSortConfig);
    let direction = "asc";
    if (prevSortConfig.key === key && prevSortConfig.direction === "asc") {
      direction = "desc";
    }
    return { key, direction };
  });
};

const getSortedPractices = (practices) => {
  if (!sortConfig.key) return practices;

  return [...practices].sort((a, b) => {
    const aValue = a[sortConfig.key] ?? "";
    const bValue = b[sortConfig.key] ?? "";

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });
};
