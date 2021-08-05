import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrytoDetailsPageRoutingModule } from './cryto-details-routing.module';

import { CrytoDetailsPage } from './cryto-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrytoDetailsPageRoutingModule
  ],
  declarations: [CrytoDetailsPage]
})
export class CrytoDetailsPageModule {}
