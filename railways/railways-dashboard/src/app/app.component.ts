import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'railways-admin';
  allTrains: any
  trainsList: any
  headings = [
    'Name',
    'Type',
    'Avg.speed',
    'Dep.station',
    'Cur.station',
    'ETA'
  ];
  polling: any;
  currentDate: any
  sections = [
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
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.currentDate = Date.now()
   
    this.polling = setInterval(() => {
      this.getList()
    }, 5000);
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
  filterList(trainsList: any, trainType: any) {

    if(trainsList?.length > 0){
      return trainsList.filter((ele: { trainType: any; }) => ele.trainType === trainType) 
    }else{
      return []
    }
  



  }
  ngOnDestroy() {
    if (this.polling) {
      clearInterval(this.polling);
    }
  }

}
