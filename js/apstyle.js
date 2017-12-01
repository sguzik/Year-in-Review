var apMonthsList = ["Jan.","Feb.","March","April","May","June","July","Aug.","Sept.","Oct.","Nov.","Dec."];

function getDateObjects(date) {
    dateObj = new Date(Date.parse(date));
    day = dateObj.getUTCDate();
    month = apMonthsList[dateObj.getUTCMonth()];
    year = dateObj.getFullYear();

    return {
      "day": day,
      "month": month,
      "year": year,
    }
};

function shortAP(date) {
  obj = getDateObjects(date);
  month = obj.month;
  day = obj.day;
  return month + " " + day;
};

function longAP(date) {
  obj = getDateObjects(date);
  day = obj.day;
  month = obj.month;
  year = obj.year;
  return month + " " + day + ", " + year;
};