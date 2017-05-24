import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Slideshow } from './slideshow';

@NgModule({
  declarations: [
    Slideshow,
  ],
  imports: [
    IonicPageModule.forChild(Slideshow),
  ],
  exports: [
    Slideshow
  ]
})
export class SlideshowModule {}
