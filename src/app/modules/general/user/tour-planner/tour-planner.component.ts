import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

interface CalendarItem {
  day: string;
  dayName: string;
  className?: string;
  isWeekend: boolean;
  hour?: string;
}

@Component({
  selector: 'app-tour-planner',
  templateUrl: './tour-planner.component.html',
  styleUrls: ['./tour-planner.component.css']
})
export class TourPlannerComponent implements OnInit {

  mode:string = "month";
  date = moment();
  calendar: Array<CalendarItem[]> = [];

  constructor() { }

  ngOnInit(): void {
    this.switchView("month");
  }

  switchView(mode: "week" | "month"){
    this.mode = mode;
    if (mode === "week") {
      this.calendar = this.createWeekView(this.date);
    } else {
      this.calendar = this.createCalendar(this.date);
    }
  }

  createWeekView(date: moment.Moment) {
    const clone = date.clone().startOf("weeks");
    const weekdaysShort = moment.weekdaysShort();
    const hours: string[] = [];
    for (let i = -1; i <= 23; i++) {
      hours.push(`${i < 10 ? "0" + i : i}`);
    }
    hours.push("00");
    const calendar: Array<CalendarItem[]> = [];
    for (let i = 0; i < hours.length; i++) {
      const hour = hours[i];
      calendar[i] = [];

      for (const dayName of weekdaysShort) {
        calendar[i].push({
          dayName,
          day: clone.format("DD"),
          isWeekend: dayName === "Sun" || dayName === "Sat",
          hour
        });
        clone.add(1, "days");
      }
    }
    return calendar;
  }

  createCalendar(month: moment.Moment) {
    const date = month.clone();
    const daysInMonth = date.daysInMonth();
    const startOfMonth = date.startOf("months").format("ddd");
    const endOfMonth = date.endOf("months").format("ddd");
    const weekdaysShort = moment.weekdaysShort();
    const calendar: CalendarItem[] = [];

    const daysBefore = weekdaysShort.indexOf(startOfMonth);
    const daysAfter =
      weekdaysShort.length - 1 - weekdaysShort.indexOf(endOfMonth);

    const clone = date.startOf("months").clone();
    if (daysBefore > 0) {
      clone.subtract(daysBefore, "days");
    }

    for (let i = 0; i < daysBefore; i++) {
      calendar.push(this.createCalendarItem(clone, "previous-month"));
      clone.add(1, "days");
    }

    for (let i = 0; i < daysInMonth; i++) {
      calendar.push(this.createCalendarItem(clone, "in-month"));
      clone.add(1, "days");
    }

    for (let i = 0; i < daysAfter; i++) {
      calendar.push(this.createCalendarItem(clone, "next-month"));
      clone.add(1, "days");
    }

    return calendar.reduce(
      (pre: Array<CalendarItem[]>, curr: CalendarItem) => {
        if (pre[pre.length - 1].length < weekdaysShort.length) {
          pre[pre.length - 1].push(curr);
        } else {
          pre.push([curr]);
        }
        return pre;
      },
      [[]]
    );
  }

  createCalendarItem(data: moment.Moment, className: string) {
    const dayName = data.format("ddd");
    return {
      day: data.format("DD"),
      dayName,
      className,
      isWeekend: dayName === "Sun" || dayName === "Sat"
    };
  }

  previous(){
    if (this.mode === "week") {
      this.date.subtract(1, "weeks");
      this.calendar = this.createWeekView(this.date);
    } else {
      this.date.subtract(1, "months");
      this.calendar = this.createCalendar(this.date);
    }
  }

  next(){
    if (this.mode === "week") {
      this.date.add(1, "weeks");
      this.calendar = this.createWeekView(this.date);
    } else {
      this.date.add(1, "months");
      this.calendar = this.createCalendar(this.date);
    }
  }

}
