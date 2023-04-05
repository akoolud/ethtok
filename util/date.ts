export const GetDateString = (d?: number) => {
  console.log("d*1e3", d * 1e3);
  if (d) {
    let date = new Date(d * 1e3);
    return date.toLocaleDateString() + "  " + date.toLocaleTimeString();
  }
  return "---";
};
