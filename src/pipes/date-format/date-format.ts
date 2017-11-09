import { Pipe, PipeTransform } from '@angular/core';

import moment from 'moment';
/**
 * Generated class for the DateFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
   transform(value: any, args?: any): any {
     var text: string = args;
     var result: string = "Invalid Date";
     result = moment(value).format(text);
     return result;
   }
}
