import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'days-ago',
})
export class DaysAgoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}
