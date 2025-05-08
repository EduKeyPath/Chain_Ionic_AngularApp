import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'unique'
})

export class uniquePipe implements PipeTransform {
    transform(collection, keyname) {
        let output = [], 
        keys = [];
        collection.forEach((item) => {
            let key = item[keyname];            
            key     = key.replace(/\s/g, '');
            key     = key.substr(key.length - 10);
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });
        return output;
    };
}