import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { DialogService } from 'primeng/dynamicdialog';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DialogService]
})
export class AppComponent implements OnInit {
  title = 'railways-admin';
  trainsList: any
  headings = [
    'Name',
    'Type',
    'Avg.speed',
    'Dep.station',
    'Cur.station',
    'ETA'
  ];
  trainTypes = [
    {
      name: 'Goods',
      value: 'GOODS'
    },
    {
      name: 'Express',
      value: 'EXPRESS'
    },
    {
      name: 'Passenger',
      value: 'PASSENGER'
    },
    {
      name: 'Super fast',
      value: 'SUPER-FAST'
    }
  ]
 
  constructor(
    
    private httpService: HttpService
  ) {
  }
  ngOnInit(): void {



    this.getList()

  }

  removeTrain(trainId: any) {
    this.httpService.sendRequest('/api/trains/delete', { trainId: trainId }).subscribe(
      (res) => {

      },
      () => {
        console.warn("Issue with getList")
      },
      () => {
        this.getList()

      }
    );
  }

  refreshList(){
    this.getList()
  }
  
  getList() {
    this.httpService.sendRequest('/api/trains/getAllTrains', {}).subscribe(
      (res) => {
        this.trainsList = res
      },
      () => {
        console.warn("Issue with getList")
      },
      () => {

      }
    );
  }

}
