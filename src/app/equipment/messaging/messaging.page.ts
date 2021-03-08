import {Component, OnInit, OnDestroy,} from '@angular/core';
import { Subscription } from 'rxjs';
import { Booking } from 'src/app/bookings/bookings.model';
import { LoadingController, IonItemSliding } from '@ionic/angular';
import { BookingsService } from 'src/app/bookings/bookings.service';
import { AuthService } from 'src/app/auth/auth.service';
import { switchMap, take } from 'rxjs/operators';
import { EquipmentService } from '../equipment.service';
import { equipment } from '../equipment.model';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.page.html',
  styleUrls: ['./messaging.page.scss'],
})
export class MessagingPage implements OnInit,OnDestroy {
  equipment: equipment;
  loadedBookings: Booking[];
  bookins : Booking[];
  private bookingSub: Subscription;
  isLoading = false;
 
  constructor(private bookingsService: BookingsService, 
    private loadingCtrl:LoadingController,private authService:AuthService,
    private equipmentService : EquipmentService,private route:ActivatedRoute) {

   }

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(bookings => {
      //this.bookins = bookings; 
      this.loadedBookings = bookings;
      this.route.paramMap.subscribe(paramMap =>{
        let fetchedUserId: string;
        this.authService.userId
        .pipe(
          take(1),
          switchMap(userId => {
          if(!userId){
            throw new Error('Could not find User!');
          }
          fetchedUserId = userId;
          return this.equipmentService
          .getEquipment(paramMap.get('equipmentId'));
        })
        )
        .subscribe( equipmen => { 
           this.equipment = equipmen;
           this.loadedBookings.filter( book =>{
             book.userId == equipmen.userId 
           })
           // equipmen.userId == fetchedUserId;
         // this.isLoading = false;
         })

      })

     
      
      
      
    });
  }
  ionViewWillEnter(){
    this.isLoading = true;
    this.bookingsService.fetchBookings().subscribe( ()=> {
      this.isLoading = false;
    });
  }
  onCancelBooking(bookingId:string,slidingEl:IonItemSliding){
    slidingEl.close();
    this.loadingCtrl.create({message:'Canceling...'})
    .then(loadingEl =>{ 
      loadingEl.present();
      this.bookingsService.cancelBooking(bookingId).subscribe( ()=>{
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy(){
    
    if(this.bookingSub){

      this.bookingSub.unsubscribe();
    }
  }
    

}