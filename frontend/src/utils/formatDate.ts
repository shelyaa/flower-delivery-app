export function formatDate(
  dateString: string | number | Date,
  locale = "uk-UA",
) {
  return new Date(dateString).toLocaleString(locale, {
    timeZone: "Etc/GMT-6",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
