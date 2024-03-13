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

export const formatTime = (dateTimeString: string) => {
  const parsedDate = new Date(dateTimeString);
  const time = parsedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return time;
};

export const renderNameInitials = (name: string) => {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[0]}`;
};
