import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
 name: 'mDateFilter'
})

export class MomentDatePipe implements PipeTransform {
    transform(timeStamp, timezone, format): any {  
        if(!!timeStamp){
            let createdDate = timeStamp;
            let timz = timezone;
            let dFormat = moment.tz(parseInt(createdDate)*1000, timz).format(format);
            return dFormat;
        }else{
            return '';
        }
    }
}