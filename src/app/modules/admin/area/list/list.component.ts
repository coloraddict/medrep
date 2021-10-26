import { Component, OnInit, TemplateRef  } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

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


  constructor(private dataService: DataService, private fb: FormBuilder, private modalService: BsModalService, public dialog: MatDialog) { 
    this.addNewAreaForm = this.fb.group({
      listAreas: this.fb.array([])
    })

    this.newAreaForm = this.fb.group({
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
    this.addClicked=true;
    if(this.addClicked){
      this.addClicked = false;
        this.dataService.addArea(this.newAreaForm.value).subscribe(res => {
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
            this.modalService.hide();
          }
          this.newAreaForm = this.fb.group({
            listAreas: this.fb.array([])
          })
          this.loadAreaList();
        })
    } else if(this.editClicked){
      this.editClicked = false;
      this.dataService.updateArea(this.newAreaForm.value).subscribe(res => {
        this.alerts = [{
          type: 'success',
          msg: `Area updated successfully`
        }];
        this.modalService.hide();
        this.newAreaForm = this.fb.group({
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogContentExampleDialog);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef);
  }
}