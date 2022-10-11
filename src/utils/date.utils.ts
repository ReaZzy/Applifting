export const getFormattedDate = (lastUpdatedAt: Date | string) => {
  const lastUpdatedDate = new Date(lastUpdatedAt);
  const days = `0${lastUpdatedDate.getDate()}`.slice(-2);
  const months = `0${lastUpdatedDate.getMonth() + 1}`.slice(-2);
  const years = lastUpdatedDate.getFullYear();
  return `${months}/${days}/${years}`;
};
