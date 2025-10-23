/** Convert minutes to 12-hour format with AM/PM */
const formatMinutesToHHMMA = (minutes) => {
  if (minutes == null || Number.isNaN(Number(minutes))) return "--:--";
  const m = Number(minutes);
  let hh = Math.floor(m / 60);
  const mm = (m % 60).toString().padStart(2, "0");
  const ampm = hh >= 12 ? "PM" : "AM";
  hh = hh % 12;
  if (hh === 0) hh = 12;
  return `${hh}:${mm} ${ampm}`;
};

export default formatMinutesToHHMMA;