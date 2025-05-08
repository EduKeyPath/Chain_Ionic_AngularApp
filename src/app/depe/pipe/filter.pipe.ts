import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({ name: 'filter' })

export class FilterPipe implements PipeTransform {
    
    transform(items: any[], searchText: string): any[] {
        console.log(items)
        if (!items) return [];
        if (!searchText) return items;
        
        return items.filter(item => {
            return Object.keys(item).some(key => {
                return String(item[key]).toLowerCase().includes(searchText.toLowerCase())/*  || sNumber.includes(searchText) */;
            });
        });
    }

}