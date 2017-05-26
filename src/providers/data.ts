import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';


@Injectable()
export class DataProvider {

  constructor(public storage: Storage) {

  }

  getData(): Promise<any>{
    return this.storage.get('photo');
  }

  save(data): void{
    let newData = JSON.stringify(data);
    this.storage.set('photo', newData);
  }

}
