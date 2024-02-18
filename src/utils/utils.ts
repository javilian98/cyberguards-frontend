export const formatDateTime = (dateTimeString: string | undefined) => {
  if (dateTimeString == undefined) return "";

  const inputDatetime = new Date(dateTimeString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDatetime = inputDatetime.toLocaleString("en-US", options);

  return formattedDatetime;
};
