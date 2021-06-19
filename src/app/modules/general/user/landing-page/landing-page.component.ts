import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class LandingPageComponent implements OnInit{
	// ddOverlay:boolean = false;
	private medicines = [];

  distributors: any;

	locations:any;

	total:any=0;

	ddOverlay:boolean = false;

	selectedElement: any;

	isDistributorSelected: boolean= false;
	isDoctorSelected: boolean = false;

	distributor_label: string = 'Select Distributor';
	location_label: string = 'Select Location';
	doctor_label: string = 'Select Doctor';

	count: any;

	area: any;

	customers = {
		"group": "customers",
		"layout": "horizontal",
		"labels": ["Doctor", "Distributor"]
	}

    constructor(private router: Router){
		
    }

  // toggleDropdown($event: any){
  //   $event.target.parentNode.classList.toggle('active');
  //   this.ddOverlay = $event.target.parentNode.classList.contains('active');
	// }

	// selectItem($evt, p_str){
	// 	$evt.target.parentNode.parentNode.parentNode.classList.remove("active");
	// 	if(p_str=='dist'){
	// 		document.querySelector("#distname").innerHTML = $evt.target.getAttribute("value");
	// 	}else if(p_str=='loc'){
	// 		document.querySelector("#locname").innerHTML = $evt.target.childNodes[1].textContent;
	// 	}
		
	// 	this.ddOverlay = false;
	// }

	// openTab($event){
	// 	var tab_id;
	// 	this.closeAllTabs();
	// 	tab_id = $event.target.getAttribute("for");
	// 	document.getElementById(tab_id+'-content').classList.remove("hide");
	// 	document.getElementById(tab_id+'-content').classList.add("active");
	// }

	closeAllTabs(){
		var content_list = document.querySelectorAll(".tab-content section");
		for(var i=0; i<content_list.length; i++){
			content_list[i].classList.remove('active');
			content_list[i].classList.add('hide');
		}
	}

	// displayTotal($event){
	// 	this.total = $event;
	// }

	increment(){

	}

	decrement(){}

	ngOnInit(){
		console.log("here");		
		// let area = this.dataService.getArea().subscribe(
		// 	(data) => {
		// 		this.locations = data['records'];
		// 		console.log(this.locations);
		// 	},
		// 	error => console.log(error)
		// );
		// this.dataService.getDb().subscribe(res => {
		// 	console.log("here");			
		// 	console.log(res);			
		// })
	}
	
	// openModal($event){
	// 	this.count = $event.quantity;
	// 	var modal = document.getElementById("modal-popup");
	// 	modal.classList.add("active");
	// }
	
	// hidePopup($event){
	// 	$event.target.classList.remove("active");
	// }

	// modifyCount($event){
	// 	$event.element.firstChild.textContent = $event.quantity;
	// 	var total = document.getElementById('total').firstChild.textContent = '100';
	// }

	// onSelection($evt){
	// 	this.loadDistributors($evt.id);
	// }

	// loadDistributors(item_id){
	// 	let distributor = this.dataService.getDistributors(item_id).subscribe(
	// 		(data) => {
	// 			this.distributors = data['records'];
	// 			console.log(this.distributors);
	// 		},
	// 		error => console.log(error)
	// 	);
	// }

	// onOptionSelect($event){
	// 	if($event.toLowerCase()=='distributor') {
	// 		this.isDistributorSelected = true;
	// 		this.isDoctorSelected = false;
	// 	} else if ($event.toLowerCase()=='doctor'){
	// 		this.isDoctorSelected = true;
	// 		this.isDistributorSelected = false;
	// 	}
	// }

	showSelectedList(){
		
	}

	// loadScheduler(){
	// 	this.router.navigateByUrl('/schedule');
	// }

	// loadDoctorsList(){
	// 	this.router.navigateByUrl('/doctors_list');
	// }

	// loadPatchList(){
	// 	this.router.navigateByUrl('/patch_list');
	// }

}