import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrytoDetailsPage } from './cryto-details.page';

const routes: Routes = [
  {
    path: '',
    component: CrytoDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrytoDetailsPageRoutingModule {}
