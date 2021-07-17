import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = "http://192.168.1.202:8080/";

  constructor(private http: HttpClient) { }

  getArea(){
    return this.http.get(this.baseUrl + "area");
  }

  addArea(payload: any){
    return this.http.post(this.baseUrl + "add", payload);
  }

  updateArea(payload: any){
    return this.http.post(this.baseUrl + "add", payload);
  }

  deleteArea(id: any) {
    return this.http.get(this.baseUrl + "delete?id=" + id);
  }


  // MEDICINES
  getMedicines(){
    return this.http.get(this.baseUrl + "medicines")
  }

  addMedicine(payload: any){
    return this.http.post(this.baseUrl + "addMedicine", payload);
  }

  updateMedicine(payload: any){
    return this.http.post(this.baseUrl + "updateMedicine", payload);
  }

  deleteMedicine(id: any) {
    return this.http.get(this.baseUrl + "deleteMedicine?id=" + id);
  }

  // PATCHES
  getPatches(){
    return this.http.get(this.baseUrl + "patches");
  }

  getPatchByArea(area_id: any = null){
    return this.http.get(this.baseUrl + "getPatchByArea?area_id=" + area_id);
  }

  addPatch(payload: any){
    return this.http.post(this.baseUrl + "addPatch", payload);
  }

  updatePatch(payload: any){
    return this.http.post(this.baseUrl + "updatePatch", payload);
  }

  deletePatch(id: any) {
    return this.http.get(this.baseUrl + "deletePatch?id=" + id);
  }

  //DOCTORS
  getDoctors(){
    return this.http.get(this.baseUrl + "doctors")
  }

  getDoctorByPatch(patch_id: any = null){
    return this.http.get(this.baseUrl + "getDoctorByPatch?patch_id=" + patch_id);
  }

  addDoctor(payload: any){
    return this.http.post(this.baseUrl + "addDoctor", payload);
  }

  updateDoctor(payload: any){
    return this.http.post(this.baseUrl + "updatePatch", payload);
  }

  deleteDoctor(id: any) {
    return this.http.get(this.baseUrl + "deletePatch?id=" + id);
  }

  // TOUR PLAN
  addPlan(payload: any){
    return this.http.post(this.baseUrl + "addPlan", payload);
  }

  // TODAYS SCHEDULE
  getTodaysPlan(){
    return this.http.get(this.baseUrl + "schedule")
  }
}
