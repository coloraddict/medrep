import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-patch-list',
  templateUrl: './patch-list.component.html',
  styleUrls: ['./patch-list.component.css']
})
export class PatchListComponent implements OnInit {

  patch_list:any = [];
  addNewPatchForm: FormGroup;
  addClicked: boolean = false;
  editClicked: boolean = false;
  dismissible = true;
  defaultAlerts: any[] = [];
  alerts = this.defaultAlerts;

  constructor(private dataService: DataService, private fb: FormBuilder) {
      this.addNewPatchForm = this.fb.group({
        listPatches: this.fb.array([])
      })
   }

  ngOnInit(): void {
    this.loadPatchList();
  }

  loadPatchList(){
    this.dataService.getPatches().subscribe(res => {
      this.patch_list = res;
    });   
  }

  onAddPatch(){
    let obj = {id: '', name: '', price: ''};
    this.addClicked = true;
    this.listPatches.push(this.newPatch(obj));
  }

  onUpdatePatch(index: any){
    this.editClicked = true;
    this.listPatches.push(this.newPatch(this.patch_list[index]));
  }

  onDelete(index: any){
    this.dataService.deletePatch(this.patch_list[index].id).subscribe(res => {
      this.alerts = [{
        type: 'success',
        msg: `Patch deleted successfully`
      }];
      this.loadPatchList();
    })
  }

  newPatch(obj: any): FormGroup {
    return this.fb.group({
      id: obj.id,
      areaid: obj.areaid,
      name: obj.name,
    })
  }

  get listPatches() : FormArray {
    return this.addNewPatchForm.get("listPatches") as FormArray
  }

  submitNewPatch(){    
    if(this.addClicked){
      this.addClicked = false;
        this.dataService.addPatch(this.addNewPatchForm.value.listPatches[0]).subscribe(res => {
          let response = JSON.parse(JSON.stringify(res));
          if(response.recordExists){
            this.alerts = [{
              type: 'success',
              msg: `Patch exists`
            }];
          }else{
            this.alerts = [{
              type: 'success',
              msg: `Patch added successfully`
            }];
          }
          this.addNewPatchForm = this.fb.group({
            listPatches: this.fb.array([])
          })
          this.loadPatchList();
        })
    } else if(this.editClicked){
      this.editClicked = false;
      this.dataService.updatePatch(this.addNewPatchForm.value.listPatches[0]).subscribe(res => {
        this.alerts = [{
          type: 'success',
          msg: `Patch updated successfully`
        }];
        this.addNewPatchForm = this.fb.group({
          listPatches: this.fb.array([])
        })
        this.loadPatchList();
      })
    }   
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }
}
