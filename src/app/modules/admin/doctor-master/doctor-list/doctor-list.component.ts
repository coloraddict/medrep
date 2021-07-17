import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorListComponent implements OnInit {

  modalRef?: BsModalRef;
  config = {
    animated: false,
    ignoreBackdropClick: true,
    class: 'modal-doctor'
  };
  doctor_list:any = [];
  addNewDoctorForm: FormGroup;
  newDoctorForm: FormGroup;
  addClicked: boolean = false;
  editClicked: boolean = false;
  dismissible = true;
  defaultAlerts: any[] = [];
  alerts = this.defaultAlerts;
  radioModel = 'Middle';
  area_list: any = [];
  patch_list: any = [];
  max = 5;
  rate = 2;
  isReadonly = true;

  constructor(private dataService: DataService, private fb: FormBuilder, private modalService: BsModalService) {
    this.addNewDoctorForm = this.fb.group({
      listDoctors: this.fb.array([])
    })

    this.newDoctorForm = this.fb.group({
      id: new FormControl(null),
      firstName: new FormControl(null, [Validators.required]),
      middleName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),      
      address1: new FormControl(null, [Validators.required]),
      address2: new FormControl(null),
      address3: new FormControl(null),
      dob: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      area: new FormControl(null, [Validators.required]),
      patch: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required]),
      degree: new FormControl(null, [Validators.required]),
      speciality: new FormControl(null, [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.dataService.getArea().subscribe(areas => {
      this.area_list = areas;
    });

    this.loadDoctorList();
  }

  loadDoctorList(){
    this.dataService.getDoctors().subscribe(res => {
      this.doctor_list = res;
    });   
  }

  onAddDoctor(){
    let obj = {id: '', name: '', price: ''};
    this.addClicked = true;
    this.listDoctors.push(this.newDoctor(obj));
  }

  onUpdateDoctor(index: any){
    this.editClicked = true;
    this.listDoctors.push(this.newDoctor(this.doctor_list[index]));
  }

  onDelete(index: any){
    this.dataService.deletePatch(this.doctor_list[index].id).subscribe(res => {
      this.alerts = [{
        type: 'success',
        msg: `Patch deleted successfully`
      }];
      this.loadDoctorList();
    })
  }

  newDoctor(obj: any): FormGroup {
    return this.fb.group({
      id: obj.id,
      areaid: obj.areaid,
      name: obj.name,
    })
  }

  get listDoctors() : FormArray {
    return this.addNewDoctorForm.get("listDoctors") as FormArray
  }

  get f(){
    return this.fb.control;
  }

  submitNewDoctor(){  
    console.log(this.newDoctorForm.value);
    this.dataService.addDoctor(this.newDoctorForm.value).subscribe(res => {
      this.loadDoctorList();
      this.modalService.hide();
    })
  }

  onClosed(dismissedAlert: any): void {
    this.alerts = this.alerts.filter(alert => alert !== dismissedAlert);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  onAreaChange(evt: any){
    this.dataService.getPatches().subscribe(patches => {
      this.patch_list = patches;
    })
  }

  showDoctorDetails(){
    alert("Doctor details");
  }

}
