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

  transaction: string = '';

  currentRecord: any;


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
      this.showConfirmationMessage();
    });   
  }

  onAddArea(){
    console.log(this.newAreaForm.value);
  }

  onDelete(index: any){
    this.transaction = 'delete';
    this.currentRecord = this.area_list[index];
    this.dataService.deleteArea(this.area_list[index].id).subscribe(res => {
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
    if(this.transaction === 'add'){
        this.dataService.addArea(this.newAreaForm.value).subscribe(res => {
          let response = JSON.parse(JSON.stringify(res));
          if(response.recordExists){
            this.openConfirmationDialog({
              title: 'Confirm Dialog', 
              message: 'Area ' + this.newAreaForm.value.name + ' with ID: ' + this.newAreaForm.value.id +  ' already exists', 
              action: 'exist'
            });
          }else{
            this.loadAreaList(); 
          }
        })
      } else if(this.transaction === 'update'){
        this.dataService.updateArea(this.newAreaForm.value).subscribe(res => {
          this.loadAreaList();
      })
    }
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.transaction = 'add';
    this.dialog.open(templateRef);
    this.newAreaForm.reset();
  }

  openUpdateDialogWithTemplateRef(templateRef: TemplateRef<any>, index: number) {
    this.transaction = 'update';
    this.newAreaForm = new FormGroup({
      id: new FormControl(this.area_list[index].id),
      name: new FormControl(this.area_list[index].name)
    })
    this.dialog.open(templateRef);
  }

  openConfirmationDialog(messageObj: any){
    messageObj.type = 'single'
    if(messageObj.action === 'add'){
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {data: messageObj });
    } else if(messageObj.action === 'exist'){
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {data: messageObj });
    } else if(messageObj.action === 'delete'){
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {data: messageObj });
    } else if(messageObj.action === 'update'){
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {data: messageObj });
    }
  }

  showConfirmationMessage(){
    if(this.transaction === 'add'){
      this.openConfirmationDialog({
        title: 'Confirm Dialog', 
        message: 'Area ' + this.newAreaForm.value.name + ' with ID: ' + this.newAreaForm.value.id +  ' added successfully', 
        action: 'add'
      });
    }else if(this.transaction === 'update'){
      this.openConfirmationDialog({
        title: 'Confirm Dialog', 
        message: 'Area ' + this.newAreaForm.value.name + ' with ID: ' + this.newAreaForm.value.id +  ' updated successfully', 
        action: 'update'
      });
    }else if(this.transaction === 'delete'){
      this.openConfirmationDialog({
        title: 'Confirm Dialog', 
        message: 'Area ' + this.currentRecord.name + ' with ID: ' + this.currentRecord.id +  ' deleted successfully', 
        action: 'delete',
      });
    }
  }
}