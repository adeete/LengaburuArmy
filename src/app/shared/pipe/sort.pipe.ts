import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform(value: any[], column: string = '', order: string = ''): any[] {
    if (!value) return value;
    if (value.length <= 1) return value;

    if (order === 'desc') return this.sortDesc(value, column);

    return this.sortAsc(value, column);
  }

  sortAsc(array: any[], column?: string) {
    if (!column || column.length === 0) return array.sort();

    return array.sort((a: any, b: any) => a[column].localeCompare(b[column]));
  }

  sortDesc(array: any[], column?: string) {
    if (!column || column.length === 0) return array.sort().reverse();

    return array
      .sort((a: any, b: any) => a[column].localeCompare(b[column]))
      .reverse();
  }
}
