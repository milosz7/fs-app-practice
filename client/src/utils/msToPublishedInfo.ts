export const msToPublishedInfo = (time: number) => {
  const msToHour = 3600000;
  const msToMinute = 60000;
  const msToSecond = 1000;
  const howLongAgo = (number: number, unit: string) => {
    return `${number} ${number === 0 || number > 1 ? `${unit}s` : unit} ago`;
  };
  const weeks = Math.floor(time / (msToHour * 24 * 7));
  if (weeks) return howLongAgo(weeks, 'week');
  const days = Math.floor(time / (msToHour * 24));
  if (days) return howLongAgo(days, 'day');
  const hours = Math.floor(time / msToHour);
  if (hours) return howLongAgo(hours, 'hour');
  const minutes = Math.floor(time / msToMinute);
  if (minutes) return howLongAgo(minutes, 'minute');
  const seconds = Math.floor(time / msToSecond);
  return howLongAgo(seconds, 'second');
};
