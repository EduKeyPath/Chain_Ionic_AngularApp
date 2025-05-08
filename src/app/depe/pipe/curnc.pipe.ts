import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'curncFilter'
})

export class CurrencyPipe implements PipeTransform {
    transform(value: string) {
        if(!!value){
            return 'INR' + value
        }else{
            return '';
        }              
    }
}