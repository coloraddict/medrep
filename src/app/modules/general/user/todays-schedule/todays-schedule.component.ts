import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-todays-schedule',
  templateUrl: './todays-schedule.component.html',
  styleUrls: ['./todays-schedule.component.css']
})
export class TodaysScheduleComponent implements OnInit {

  plan_list: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(){
    this.dataService.getTodaysPlan().subscribe(plans => {
      this.plan_list = plans;
    })
  }

}
