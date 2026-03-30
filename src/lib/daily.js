export function resolveDailyChallenge(challenges, dateKey) {
  const sorted = [...challenges].sort((a, b) => a.date.localeCompare(b.date));
  const exact = sorted.find((item) => item.date === dateKey);

  if (exact) return exact;

  const previous = [...sorted].reverse().find((item) => item.date <= dateKey);
  return previous || sorted[0] || null;
}

export function buildProgressKey(series, mode, dateKey) {
  return `seriesdaily:${series}:${mode}:${dateKey}`;
}