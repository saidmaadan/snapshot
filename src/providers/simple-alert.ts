import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class SimpleAlertProvider {

  constructor(public alertCtrl: AlertController) {

  }

  createAlert(title: string, message: string): any{
    return this.alertCtrl.create({
      title:title,
      message:message,
      buttons:[
        {
          text: 'Ok'
        }
      ]
    });

  }

}
