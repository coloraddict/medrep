import { Component, OnInit, TemplateRef  } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  modalRef?: BsModalRef;
  area_list:any = [];
  addNewAreaForm: FormGroup;
  addClicked: boolean = false;
  editClicked: boolean = false;
  dismissible = true;
  defaultAlerts: any[] = [];
  alerts = this.defaultAlerts;
  config = {
    animated: false,
    ignoreBackdropClick: true,
    class: 'modal-doctor'
  };
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'actions'];

  newAreaForm: FormGroup;

  areaId: string = '';
  areaName: string = '';


  constructor(private dataService: DataService, private fb: FormBuilder, private modalService: BsModalService, public dialog: MatDialog) { 
    this.addNewAreaForm = this.fb.group({
      listAreas: this.fb.array([])
    })

    this.newAreaForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.loadAreaList();
  }

  loadAreaList(){
    this.dataService.getArea().subscribe(res => {
      this.area_list = res;
      this.dataSource = res;
    });   
  }

  onAddArea(){
    console.log(this.newAreaForm.value);
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
    this.addClicked=true;
    if(this.addClicked){
      this.addClicked = false;
        this.dataService.addArea(this.newAreaForm.value).subscribe(res => {
          let response = JSON.parse(JSON.stringify(res));
          if(response.recordExists){
            const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Confirm Dialog',
                message: 'Area with ID: ' + this.newAreaForm.value.id +  ' already exists'
              }
            });
          }else{
            const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
              data: {
                title: 'Confirm Dialog',
                message: 'Area with ID: ' + this.newAreaForm.value.id +  ' added successfully'
              }
            });
          }
          this.loadAreaList();
        })
    } else if(this.editClicked){
      this.editClicked = false;
      this.dataService.updateArea(this.newAreaForm.value).subscribe(res => {
        this.alerts = [{
          type: 'success',
          msg: `Area updated successfully`
        }];
        this.loadAreaList();
      })
    }   
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
    this.newAreaForm.reset();
  }
}