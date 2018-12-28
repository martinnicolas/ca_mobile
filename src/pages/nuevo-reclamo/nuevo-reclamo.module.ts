import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoReclamoPage } from './nuevo-reclamo';

@NgModule({
  declarations: [
    NuevoReclamoPage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoReclamoPage),
  ],
})
export class NuevoReclamoPageModule {}
