import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'notification' })

export class NotificationPipe implements PipeTransform {
    userId = localStorage.getItem('userId');
    transform(items) {
        if (!items) return [];
        let readBy = JSON.parse(items);
        let counter = 0;
        let ob = Object.keys(readBy).forEach((k) => {            
            let users = readBy[k];
            let userArr = users.split(',');
            if(!userArr.includes(this.userId)){
                counter++;
            }            
        });
        return counter;
    }
}