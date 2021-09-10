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

const formatToApiDate = (date: any) => {
  return (
    date.year +
    '-' +
    (date.month < 10 ? '0' + date.month : date.month) +
    '-' +
    (date.day < 10 ? '0' + date.day : date.day) +
    ' 00:00:00'
  );
};

export { formatToMyDate, formatToApiDate };
