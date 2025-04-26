// Function to display date in human-readable format
export const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-GB", { month: "short" });
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};
