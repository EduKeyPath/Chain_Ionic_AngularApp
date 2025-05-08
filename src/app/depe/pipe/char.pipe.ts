import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'charFilter'
})

export class CharacterPipe implements PipeTransform {
    transform(value: string) {
        if(!!value){
            let letter = value.split(' ');
            let fC = letter[0].split('')[0];
            let sC =  letter[letter.length - 1].split('')[0];
            let charM = fC + sC;
            let char = charM.toUpperCase();
            return char;
        }else{
            return '';
        }
              
    }
}