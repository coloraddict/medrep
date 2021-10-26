import { Component, OnInit, TemplateRef  } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  medicine_list:any = [];
  addNewMedicineForm: FormGroup;
  addClicked: boolean = false;
  editClicked: boolean = false;
  dismissible = true;
  defaultAlerts: any[] = [];
  alerts = this.defaultAlerts;


  constructor(private dataService: DataService, private fb: FormBuilder, public dialog: MatDialog) { 
    this.addNewMedicineForm = this.fb.group({
      listMedicines: this.fb.array([])
    })
  }

  ngOnInit(): void {
    this.loadMedicineList();
  }

  loadMedicineList(){
    this.dataService.getMedicines().subscribe(res => {
      this.medicine_list = res;
    });   
  }

  onAddMedicine(){
    let obj = {id: '', name: '', price: ''};
    this.addClicked = true;
    this.listMedicines.push(this.newMedicine(obj));
  }

  onUpdateArea(index: any){
    this.editClicked = true;
    this.listMedicines.push(this.newMedicine(this.medicine_list[index]));
  }

  onDelete(index: any){
    this.dataService.deleteMedicine(this.medicine_list[index].id).subscribe(res => {
      this.alerts = [{
        type: 'success',
        msg: `Medicine deleted successfully`
      }];
      this.loadMedicineList();
    })
  }

  get listMedicines() : FormArray {
    return this.addNewMedicineForm.get("listMedicines") as FormArray
  }

  newMedicine(obj: any): FormGroup {
    return this.fb.group({
      id: obj.id,
      name: obj.name,
      price: obj.price
    })
  }

  submitNewMedicine(){    
    if(this.addClicked){
      this.addClicked = false;
        this.dataService.addMedicine(this.addNewMedicineForm.value.listMedicines[0]).subscribe(res => {
          let response = JSON.parse(JSON.stringify(res));
          if(response.recordExists){
            this.alerts = [{
              type: 'success',
              msg: `Medicine exists`
            }];
          }else{
            this.alerts = [{
              type: 'success',
              msg: `Medicine added successfully`
            }];
          }
          this.addNewMedicineForm = this.fb.group({
            listMedicines: this.fb.array([])
          })
          this.loadMedicineList();
        })
    } else if(this.editClicked){
      this.editClicked = false;
      this.dataService.updateMedicine(this.addNewMedicineForm.value.listMedicines[0]).subscribe(res => {
        this.alerts = [{
          type: 'success',
          msg: `Medicine updated successfully`
        }];
        this.addNewMedicineForm = this.fb.group({
          listMedicines: this.fb.array([])
        })
        this.loadMedicineList();
      })
    }   
  }

  reset(): void {
    // this.alerts = this.defaultAlerts;
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }

}
