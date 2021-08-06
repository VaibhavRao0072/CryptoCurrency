import { Component, OnInit } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { NavigationExtras, Router } from '@angular/router';
import { IonLoaderService } from '../services/ion-loader.service';
import { Post, CryptoData } from '../intefrace/post.model';
import { Platform, ToastController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  responseData ={};
  showTryAgain : boolean = false;
  cryptoListUrl : string = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?&limit=20";
  headers = {
    'X-CMC_PRO_API_KEY': 'cdcfd4be-f0d1-4fcc-a0ce-484887b9117e',
    'Access-Control-Allow-Origin': '*',
  }
  constructor(public http: HTTP,public router: Router,private ionLoaderService: IonLoaderService,private platform: Platform) {
  }

  ngOnInit(){
    this.getListOfCrypto();
  }

  //API call to get the list of cryptoCurrency
  getListOfCrypto(){
    this.http.setDataSerializer("json");
    this.ionLoaderService.loader();
    this.showTryAgain = false;
    this.platform.ready().then(() => { 
    this.http.get(this.cryptoListUrl, {}, this.headers)
       .then(res => {
          this.ionLoaderService.dismissLoader();
          if(res.status == 200){
            let response : Post = JSON.parse(res.data);
            if(response.status.error_code == 0){
              this.responseData = response.data;
            }else if(response.status.error_code == 400){ //Bad Request condition
              this.showTryAgain = true;
              this.ionLoaderService.showError("Bad request. Try Again");
            }else if(response.status.error_code == 1002){ //Unauthorized
              this.showTryAgain = true;
              this.ionLoaderService.showError("Unauthorized user");
            }else if(response.status.error_code == 1006){ //Forbidden
              this.showTryAgain = true;
              this.ionLoaderService.showError("User is Forbidden");
            }else if(response.status.error_code == 1008){ //Too Many request
              this.showTryAgain = true;
              this.ionLoaderService.showError("Too Many Request. Try Again");
            }else if(response.status.error_code == 500){ //Internal Server Error
              this.showTryAgain = true;
              this.ionLoaderService.showError("Internal Server Error");
            }
          }else{
            this.showTryAgain = true;
            this.ionLoaderService.showError("Unable to process your request");
          }
       })
       .catch(error => {
         this.ionLoaderService.dismissLoader();
         this.showTryAgain = true;
         console.log("--------",error);
       });
      });
  }

  goToDetails(cryptDetails){
    console.log(cryptDetails);
    let ObjToSend : NavigationExtras = cryptDetails;
    this.router.navigate(['/cryto-details'], { 
      state: ObjToSend 
    });
  }

}
