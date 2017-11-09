import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { StationInterface } from '../../model/StationInterface';

/**
 * Generated class for the StationIconComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'station-icon',
  templateUrl: 'station-icon.html'
})
export class StationIconComponent {
  @Input() private station: StationInterface;
  private colorCodes: Array<{
    code: string,
    color: string
  }>

  constructor() {
    this.colorCodes = [];
  }

  ngOnChanges(changes) {
    if(this.station) {
      this.loadColorCodes();
    }
  }

  ngOnInit() {
    if(this.station) {
      this.loadColorCodes();
    }
  }

  private loadColorCodes = function() {
    this.colorCodes = [];
    let codes = this.station.code.split(",");
    let colors = this.station.colors;
    for(let i = 0; i < colors.length; i ++) {
      let colorCode = {
        code: "",
        color: colors[i]
      };
      if(codes[i]) {
        colorCode.code = codes[i];
      }
      this.colorCodes.push(colorCode);
    }
  };

}
