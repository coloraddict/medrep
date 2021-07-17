import { Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { DataService } from 'src/app/services/data.service';
import * as moment from "moment";
import { ViewChildren } from '@angular/core';

interface CalendarItem {
  day: string;
  dayName: string;
  className?: string;
  isWeekend: boolean;
  hour?: string;
  plan?: any
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
  selectedDay?: any = {};
  selectedDayElement?:any;
  selectedPatch: string = 'Select Patch';
  patch_list: any = [];
  doctor_list: any = [];
  area_list: any = [];
  @ViewChild('slotContainer') slotContainer?: ElementRef<any>;
  slots: any = ['10:30-11:00', '11:30-12:00', '12:30-1:00', '1:30-2:00', '3:00-3:30', '4:00-4:30', '5:00-5:30'];

  planForm: FormGroup;

  constructor(private modalService: BsModalService, private dataService: DataService, private element: ElementRef, private formBuilder: FormBuilder) { 
    this.planForm = this.formBuilder.group({
      slot: new FormControl(),
      area: new FormControl(),
      patch: new FormControl(),
      doctor: new FormControl()
    })
  }

  ngOnInit(): void {
    this.selectedDay.plan = [];
    this.switchView("month");
    this.loadAreaList();
  }

  openModal(template: TemplateRef<any>, evt: any, index: number) {    
    this.selectedDayElement = evt.target;
    let cellIndex = this.getNodeIndex(this.selectedDayElement);
    this.selectedDay = this.calendar[index][cellIndex];
    this.modalRef = this.modalService.show(template, this.config);
  }

  getNodeIndex (element: any): any {
    if(element!==undefined) {
      return Array.from(element.parentNode.childNodes).indexOf(element);
    }    
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
    console.log(date);
    const daysInMonth = date.daysInMonth();
    console.log("daysInMonth", daysInMonth);
    const startOfMonth = date.startOf("months").format("ddd");
    console.log("startOfMonth", startOfMonth);
    const endOfMonth = date.endOf("months").format("ddd");
    console.log("endOfMonth", endOfMonth);
    const weekdaysShort = moment.weekdaysShort();
    console.log("weekdaysShort", weekdaysShort);
    const calendar: CalendarItem[] = [];

    const daysBefore = weekdaysShort.indexOf(startOfMonth);
    console.log("daysBefore", daysBefore);
    const daysAfter = weekdaysShort.length - 1 - weekdaysShort.indexOf(endOfMonth);
    console.log("daysAfter", daysAfter);
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

    // console.log(calendar);
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

  onSelectSlot(slot: any, evt: any){
    this.deselectSlots();
    evt.target.classList.add('selected');
  }

  loadAreaList(){
    this.dataService.getArea().subscribe(res => {
      this.area_list = res;
    });   
  }

  loadPatchList(){
    this.dataService.getPatches().subscribe(res => {
      this.patch_list = res;
    });   
  }

  loadDoctorList(){
    this.dataService.getDoctors().subscribe(res => {
      this.doctor_list = res;
    });   
  }

  deselectSlots(){
    console.log(this.slotContainer?.nativeElement);
  }

  onAreaChange(evt: any){
    this.dataService.getPatchByArea(evt.target.value).subscribe(res => {
      this.patch_list = res;
    })
  }

  onPatchChange(evt: any){
    this.dataService.getDoctorByPatch(evt.target.value).subscribe(res => {
      this.doctor_list = res;
    })
  }

  setPlan(slot: string){
    let plan = {
      id: null,
      user: 'Pradeep Singh',
      visitDate: '10/07/2021',
      visitTime: slot,
      area: {},
      patch: {},
      doctor: {},
      createdBy: 'Pradeep Singh'
    }

    var areaid = this.planForm.get('area')?.value;
    var selectedarea = this.area_list.filter((item: any) => item.id === areaid);
    plan.area = {id: areaid, name: selectedarea[0].name};

    var patchid = this.planForm.get('patch')?.value;
    var selectedPatch = this.patch_list.filter((item: any) => item.id === patchid);
    plan.patch = {id: patchid, name: selectedPatch[0].name};

    var doctorid = this.planForm.get("doctor")?.value;
    var selectedDoctor = this.doctor_list.filter((item: any) => item.id === doctorid);
    plan.doctor = {id: doctorid, name: selectedDoctor[0].firstName + ' ' + ' ' + selectedDoctor[0].lastName};    

    this.dataService.addPlan(plan).subscribe(response => {
      console.log(response);
      this.modalService.hide();

      if(JSON.parse(JSON.stringify(response)).success) {
        if(this.selectedDayElement.classList.contains("calendar-days")){
          this.selectedDayElement.classList.add("hasPlan");
        }else{
          this.selectedDayElement.parentNode.classList.add("hasPlan");
        }
        this.selectedDay["plan"] = plan;
        console.log(this.calendar);
      } else {
        alert('record exists');
      }      
    })
    
  }

}
