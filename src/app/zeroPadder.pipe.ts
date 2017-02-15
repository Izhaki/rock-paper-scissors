import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'zeroPadder'})
export class ZeroPadderPipe implements PipeTransform {
  transform( value: number, digits: number ): string {
    return Array( digits - String( value ).length + 1 ).join( '0' ) + value;
  }
}
