import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { DataService } from 'src/app/services/data.service';
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
  styleUrls: ['./tour-planner.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: false, autoClose: true } }]
})
export class TourPlannerComponent implements OnInit {

  modalRef?: BsModalRef;
  config = {
    animated: false,
    ignoreBackdropClick: true,
    class: 'modal-custom'
  };
  mode:string = "month";
  date = moment();
  calendar: Array<CalendarItem[]> = [];
  selectedDay?: string;
  selectedPatch: string = 'Select Patch';
  patch_list: any = [];
  slots: any = ['10:30-11:00', '11:30-12:00', '12:30-1:00', '1:30-2:00', '3:00-3:30', '4:00-4:30', '5:00-5:30'];

  constructor(private modalService: BsModalService, private dataService: DataService) { }

  ngOnInit(): void {
    this.switchView("month");
    this.dataService.getPatches().subscribe(patches => {
      this.patch_list = patches;
    })
  }

  openModal(template: TemplateRef<any>, day: any) {
    console.log(day);
    this.selectedDay = day.day + ", " + day.dayName;
    this.modalRef = this.modalService.show(template, this.config);
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

  onSelectPatch(p_patch:any){
    this.selectedPatch = p_patch.name;
  }

  onSelectSlot(slot: any){
    
  }

}
