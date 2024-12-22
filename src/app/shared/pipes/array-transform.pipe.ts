import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayTransform',
  standalone: true
})
export class ArrayTransformPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
