import { Component } from '@angular/core';
import { Platform, ToastController, AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  counter = 0;
  constructor(private platform: Platform,
    private toastCtrl : ToastController,
    private router : Router,
    private altCrt : AlertController,
    private _location: Location,) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {    
      //Hardware back button handle, Click back twice exits the app 
      this.platform.backButton.subscribeWithPriority(999999,()=>{
        if (this._location.isCurrentPathEqualTo('/home')) {
          if (this.counter == 0) {
            this.counter++;
            this.presentToast();
            setTimeout(() => { this.counter = 0 }, 3000)
          } else {
            navigator['app'].exitApp();
          }
        } else {
          // Navigate to back page
          console.log('Navigate to back page');
          this._location.back();
    
        }
      });
    });
  }

  //Toast msg to show user when hardware back is clicked on home page
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: "Press again to exit",
      duration: 3000,
      position: "bottom"
    });
    toast.present();
  }
}
