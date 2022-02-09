export const CleanTimestamp = (timestamp: string) => {
  let newString = "";
  const year = timestamp.substring(0, 4);
  const month = timestamp.substring(5, 7);
  const day = timestamp.substring(8, 10);
  const time = timestamp.substring(11, 16);
  newString = `${day}/${month}/${year}`;
  if (timestamp.length > 11) newString = newString + `, ${time}`;
  return newString;
};
