export const GetDateString = (d?: number) => {
  if (d) {
    let date = new Date(d * 1e3);
    return date.toLocaleDateString() + "  " + date.toLocaleTimeString();
  }
  return "---";
};
