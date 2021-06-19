import { Component, OnInit, TemplateRef  } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  area_list:any = [];
  addNewAreaForm: FormGroup;
  addClicked: boolean = false;
  editClicked: boolean = false;
  dismissible = true;
  defaultAlerts: any[] = [];
  alerts = this.defaultAlerts;


  constructor(private dataService: DataService, private fb: FormBuilder ) { 
    this.addNewAreaForm = this.fb.group({
      listAreas: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.loadAreaList();
  }

  loadAreaList(){
    this.dataService.getArea().subscribe(res => {
      this.area_list = res;
    });   
  }

  onAddArea(){
    let obj = {id: '', name: ''};
    this.addClicked = true;
    this.listAreas.push(this.newArea(obj));
  }

  onUpdateArea(index: any){
    this.editClicked = true;
    this.listAreas.push(this.newArea(this.area_list[index]));
  }

  onDelete(index: any){
    this.dataService.deleteArea(this.area_list[index].id).subscribe(res => {
      this.alerts = [{
        type: 'success',
        msg: `Area deleted successfully`
      }];
      this.loadAreaList();
    })
  }

  get listAreas() : FormArray {
    return this.addNewAreaForm.get("listAreas") as FormArray
  }

  newArea(obj: any): FormGroup {
    return this.fb.group({
      id: obj.id,
      name: obj.name,
    })
  }

  submitNewArea(){    
    if(this.addClicked){
      this.addClicked = false;
        this.dataService.addArea(this.addNewAreaForm.value.listAreas[0]).subscribe(res => {
          let response = JSON.parse(JSON.stringify(res));
          if(response.recordExists){
            this.alerts = [{
              type: 'success',
              msg: `Area exists`
            }];
          }else{
            this.alerts = [{
              type: 'success',
              msg: `Area added successfully`
            }];
          }
          this.addNewAreaForm = this.fb.group({
            listAreas: this.fb.array([])
          })
          this.loadAreaList();
        })
    } else if(this.editClicked){
      this.editClicked = false;
      this.dataService.updateArea(this.addNewAreaForm.value.listAreas[0]).subscribe(res => {
        this.alerts = [{
          type: 'success',
          msg: `Area updated successfully`
        }];
        this.addNewAreaForm = this.fb.group({
          listAreas: this.fb.array([])
        })
        this.loadAreaList();
      })
    }   
  }

  reset(): void {
    // this.alerts = this.defaultAlerts;
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
