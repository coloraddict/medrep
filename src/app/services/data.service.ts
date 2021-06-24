import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getArea(){
    return this.http.get("http://192.168.1.205:8080/area");
  }

  addArea(payload: any){
    return this.http.post("http://192.168.1.205:8080/add", payload);
  }

  updateArea(payload: any){
    return this.http.post("http://192.168.1.205:8080/add", payload);
  }

  deleteArea(id: any) {
    return this.http.get("http://192.168.1.205:8080/delete?id=" + id);
  }


  // MEDICINES
  getMedicines(){
    return this.http.get("http://192.168.1.205:8080/medicines")
  }

  addMedicine(payload: any){
    return this.http.post("http://192.168.1.205:8080/addMedicine", payload);
  }

  updateMedicine(payload: any){
    return this.http.post("http://192.168.1.205:8080/updateMedicine", payload);
  }

  deleteMedicine(id: any) {
    return this.http.get("http://192.168.1.205:8080/deleteMedicine?id=" + id);
  }

  // PATCHES
  getPatches(area_id: any = null){
    console.log(area_id);
    return this.http.get("http://192.168.1.205:8080/patches?area_id=" + area_id);
  }

  addPatch(payload: any){
    return this.http.post("http://192.168.1.205:8080/addPatch", payload);
  }

  updatePatch(payload: any){
    return this.http.post("http://192.168.1.205:8080/updatePatch", payload);
  }

  deletePatch(id: any) {
    return this.http.get("http://192.168.1.205:8080/deletePatch?id=" + id);
  }

  //DOCTORS
  getDoctors(){
    return this.http.get("http://192.168.1.205:8080/doctors")
  }

  addDoctor(payload: any){
    return this.http.post("http://192.168.1.205:8080/addDoctor", payload);
  }

  updateDoctor(payload: any){
    return this.http.post("http://192.168.1.205:8080/updatePatch", payload);
  }

  deleteDoctor(id: any) {
    return this.http.get("http://192.168.1.205:8080/deletePatch?id=" + id);
  }

}
