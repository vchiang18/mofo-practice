export const generateFileName = () => {
  const date = new Date();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = date.toLocaleDateString(options).replace(/-/g, "");
  return `PracticesExport_${formattedDate}.csv`;
};
