import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ModalController, Platform} from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { PhotoModel } from '../../models/photo-model';
import { SimpleAlertProvider } from '../../providers/simple-alert';
import { DataProvider } from '../../providers/data';

declare var cordova;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loaded: boolean = false;
  photoTaken: boolean = false;
  photos: PhotoModel[] = [];

  constructor(
    public dataService: DataProvider,
    public platform: Platform,
    public simpleAlert: SimpleAlertProvider,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public camera: Camera,
    public file: File) {

  }

  ionViewDidLoad(){

    this.platform.ready().then(() => {
      this.loadPhotos();
    });
    this.platform.resume.subscribe(() => {
      if(this.photos.length > 0){
        let today = new Date();

        if(this.photos[0].date.setHours(0,0,0,0) === today.setHours(0,0,0,0)){
          this.photoTaken = true;
        }
        else{
          this.photoTaken = false;
        }
      }
    });
  }
  loadPhotos(): void{
    // this.loaded = true;
    this.dataService.getData().then((photos) => {
      let savedPhotos: any = false;
      if(typeof(photos) != "undefined"){
        savedPhotos = JSON.parse(photos);
      }
      if(savedPhotos){
        savedPhotos.forEach(savedPhoto => {
          this.photos.push(new PhotoModel(savedPhoto.image, new Date(savedPhoto.date)));
        });
      }
      if(this.photos.length > 0){
        let today = new Date();

        if(this.photos[0].date.setHours(0,0,0,0) === today.setHours(0,0,0,0)){
          this.photoTaken = true;
        }
      }
      this.loaded = true;
    });
  }

  takePhoto(): any {
    if(!this.loaded || this.photoTaken){
      return false;
    }
    if(!this.platform.is('cordova')){
      console.log("You can only take photos on a device!");
      return false;
    }

    let options = {
      quality: 100,
      destinationType: 1,//return a path to the image on the device
      sourceType: 1, // use the camera to grab the image
      encodingType: 0, //return the image in jpeg format
      cameraDirection: 1, //front facing camera
      saveToPhotoAlbum: true //save a copy to the users photo album as well
    };

    this.camera.getPicture(options).then((imagePath) => {

      //Grab the file name
      let currentName = imagePath.replace(/^.*[\\\/]/, '');

  //Create a new file name
      let d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";

        if(this.platform.is('ios')){

          //Move the file to permanent storage
          this.file.moveFile(cordova.file.tempDirectory, currentName, cordova.file.dataDirectory, newFileName).then((success: any) => {

            this.photoTaken = true;
            this.createPhoto(success.nativeURL);
            this.sharePhoto(success.nativeURL);

          }, (err) => {

            console.log(err);
            let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong.');
            alert.present();

          });

        } else {
          this.photoTaken = true;
          this.createPhoto(imagePath);
          this.sharePhoto(imagePath);
        }
      },
      (err) => {
        let alert = this.simpleAlert.createAlert('Oops!', 'Something went wrong...');
        alert.present();
      }
    );

  }

  createPhoto(photo): void {
    let newPhoto = new PhotoModel(photo, new Date());
    this.photos.unshift(newPhoto);
    this.save();
  }

  removePhoto(photo): void {
    let today = new Date();
    if(photo.date.setHours(0,0,0,) === today.setHours(0,0,0,0)){
      this.photoTaken = false;
    }
    let index = this.photos.indexOf(photo);
    if(index > -1){
      this.photos.splice(index, 1);
      this.save();
    }

  }

  playSlideshow(): void {

  }

  sharePhoto(image): void {

  }

  save(): void {

  }
}
