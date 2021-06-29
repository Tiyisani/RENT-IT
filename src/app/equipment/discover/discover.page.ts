import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { EquipmentService } from '../equipment.service';
import { equipment } from '../equipment.model';
import { Subscription } from 'rxjs';
import { SegmentChangeEventDetail } from '@ionic/core';
import { IonInfiniteScroll, IonVirtualScroll, MenuController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;

  

  loadedEquipment: equipment[];
  listLoadedEquipment: equipment[];
  relevantEquipment: equipment[];
  isLoading = false;
  private equipmentSub: Subscription;
  pageSize : number = 5;
  usePicker =  false;


  constructor(private equipmentService:EquipmentService,
    private menuCtrl:MenuController,
    private authService: AuthService,private platform:Platform
    ) { }

  ngOnInit() {
  this.start();
  if(this.platform.is('desktop')
    ){
      this.usePicker = true;
    }
   
  }

  start(){
    this.equipmentSub = this.equipmentService.equipment.subscribe(equipment => {
      this.loadedEquipment = equipment;
      this.relevantEquipment = this.loadedEquipment;
      this.listLoadedEquipment = this.relevantEquipment.slice(1);
      
      
      
    }); 
  

  }
  
  loadData(event) {
    setTimeout(() => {

      this.equipmentSub = this.equipmentService.equipment.subscribe(equipment => {
        equipment.forEach(element => {
          //this.listLoadedEquipment = this.relevantEquipment.slice(1);
          this.listLoadedEquipment.unshift(element)
        });

        event.target.complete();
        //Rerender Virtual Scroll List After Adding New Data
       // this.virtualScroll.checkEnd();
  
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.listLoadedEquipment.length > 9) {
          
          event.target.disabled = true;
        }
        
      }); 
      
     
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.equipmentService.fetchEquipment().subscribe( () => {
      this.isLoading = false;
    });
  }


  onOpenMenu() {
    this.menuCtrl.toggle();
  }

 async filterList(event){
  this.equipmentSub = this.equipmentService.equipment.subscribe(equipment => {
    this.loadedEquipment = equipment;
   // this.relevantEquipment = this.loadedEquipment;
    this.listLoadedEquipment = this.relevantEquipment.slice(1);
  });
  const searchTerm = event.srcElement.value

  if (!searchTerm){
     this.relevantEquipment = this.loadedEquipment;
     this.listLoadedEquipment = this.relevantEquipment.slice(1);
    return;
  }

this.relevantEquipment = this.loadedEquipment.filter(
          equipment => { 
            if (equipment.title && searchTerm){

            return (equipment.title.toLowerCase().indexOf(searchTerm.toLowerCase())
            >-1 || equipment.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 )
          }})
  }


  filterEquipment(event){
  this.equipmentSub = this.equipmentService.equipment.subscribe(equipment => {
    this.loadedEquipment = equipment;
   // this.relevantEquipment = this.loadedEquipment;
    this.listLoadedEquipment = this.relevantEquipment.slice(1);
  });
    
 if (event.detail.value==="All"){
  this.ngOnInit();
 }

   else if (event.detail.value==="car"){

      this.relevantEquipment = this.loadedEquipment.filter(
        equipment => equipment.type === "car"
        );
          
      }
        else if (event.detail.value==="truck"){
          this.relevantEquipment = this.loadedEquipment.filter(
            equipment => equipment.type === "truck"
            );
        }

        else if (event.detail.value==="mining"){
          this.relevantEquipment = this.loadedEquipment.filter(
            equipment => equipment.type === "mining"
            );
        }

        else if (event.detail.value==="construction"){
          this.relevantEquipment = this.loadedEquipment.filter(
            equipment => equipment.type === "construction"
            );
        }

        else if (event.detail.value==="events"){
          this.relevantEquipment = this.loadedEquipment.filter(
            equipment => equipment.type === "events"
            );
        }
        else if (event.detail.value==="farming"){
          this.relevantEquipment = this.loadedEquipment.filter(
            equipment => equipment.type === "farming"
            );
        }
        else if (event.detail.value==="other"){
          this.relevantEquipment = this.loadedEquipment.filter(
            equipment => equipment.type === "other"
            );
        }
        
        this.listLoadedEquipment = this.relevantEquipment.slice(1);
     
    }


  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {

    this.authService.userId.pipe(take(1)).subscribe(userId => {

      if(event.detail.value==='all'){

        this.relevantEquipment = this.loadedEquipment;
        this.listLoadedEquipment = this.relevantEquipment.slice(1);

      } 

      else if (event.detail.value==='bookable'){

        this.relevantEquipment = this.loadedEquipment.filter(
          place => place.userId !== userId
        );
        

      }

      else {

        this.relevantEquipment = this.loadedEquipment.filter(
          equipment => equipment.userId !== userId
          );
      }
      this.listLoadedEquipment = this.relevantEquipment.slice(1);
    });
    
  }

  ngOnDestroy(){
    if(this.equipmentSub){
      this.equipmentSub.unsubscribe();
    }
  }


}
