export function getMadridDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatMadridLongDate(dateKey, lang = "es") {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "es-ES", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}