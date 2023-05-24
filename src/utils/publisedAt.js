export const publishedAt = (dateString) => {
  const date = new Date(dateString);
  const differenceInMinutes = Date.now() - date.getTime();

  const diffInDays = Math.floor(differenceInMinutes / (1000 * 60 * 60 * 24));

  return diffInDays + " days ago";
};
