import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage,  ViewController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-slideshow',
  templateUrl: 'slideshow.html',
})
export class Slideshow {

  @ViewChild('imagePlayer') imagePlayer: ElementRef;
  imagePlayerInterval: any;
  photos: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.photos = this.navParams.get('photos');
  }

  ionViewDidEnter() {
    this.playPhotos();
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

  playPhotos(){
    let imagePlayer = this.imagePlayer.nativeElement;
    let i = 0;

    //Clear any interval already set
    clearInterval(this.imagePlayerInterval);
    //Restart
    this.imagePlayerInterval = setInterval(() => {
      if(i < this.photos.length){
        imagePlayer.src = this.photos[i].image;
        i++;
      }
      else{
        clearInterval(this.imagePlayerInterval);
      }
    }, 500);
  }

}
