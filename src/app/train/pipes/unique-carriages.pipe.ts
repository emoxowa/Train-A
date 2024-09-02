import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueCarriages',
  standalone: true,
})
export class UniqueCarriagesPipe implements PipeTransform {
  transform(carriages: string[]): string[] {
    return Array.from(new Set(carriages)).sort();
  }
}
