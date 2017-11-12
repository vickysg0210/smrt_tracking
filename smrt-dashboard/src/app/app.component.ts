import { Component } from '@angular/core';
import { TrackInterface } from "../model/TrackInterface";
import { StationInterface } from "../model/StationInterface"



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private tracks : TrackInterface[];
  private track : TrackInterface;
  private station1: StationInterface;
  private station2 : StationInterface;
  private station3 : StationInterface;
  constructor() {
    this.station1 = {
      stationId: 1,
      name: "station1",
      code: "codeS1",
      color: [],
      date: "date1"
    };
    this.station2 = {
      stationId: 2,
      name: "station2",
      code: "codeS2",
      color: [],
      date: "date2"
    };
    this.station3 = {
      stationId: 3,
      name: "station3",
      code: "codeS3",
      color: [],
      date: "date3"
    };
    this.tracks=[{
      trackId: 1,
      name: "Track1",
      startStation: this.station1,
      endStation: this.station2,
      date : "date1"
    },{
      trackId: 2,
      name: "Track2",
      startStation: this.station2,
      endStation: this.station3,
      date : "date2"
    }];
    this.track ={
      trackId : 0,
      name:"",
      startStation: this.station1,
      endStation: this.station2,
      date: "empty"
    }
   }
  ngOnInit() {
  }

  processTrackNumber = function(index:number){
    this.track = this.tracks[index];
  }
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Section 1', 'Section 2', 'Section 3', 'Section 4', 'Section 5', 'Section 6', 'Section 7'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'workers'},
  ];

}
