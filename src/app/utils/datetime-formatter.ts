import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

class DateTimeFormater {
  formatToMyDate(dateTime: String) {
    const myDate = new Date(dateTime.toString());
    return (
      myDate.getDate() +
      '/' +
      (myDate.getMonth() + 1) +
      '/' +
      myDate.getFullYear()
    );
  }
  formatToApiDate(date: any) {
    return (
      date.year +
      '-' +
      (date.month < 10 ? '0' + date.month : date.month) +
      '-' +
      (date.day < 10 ? '0' + date.day : date.day) +
      ' 00:00:00'
    );
  }
}

export { DateTimeFormater };
