const formatToMyDate = (dateTime: String) => {
  const myDate = new Date(dateTime.toString());
  return (
    myDate.getDate() +
    '/' +
    (myDate.getMonth() + 1) +
    '/' +
    myDate.getFullYear()
  );
};

export { formatToMyDate };
