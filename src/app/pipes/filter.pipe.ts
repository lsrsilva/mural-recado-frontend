import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string, searchProp?: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    if (searchProp) {
      return items.filter(it => {
        return it[searchProp].toLocaleLowerCase().includes(searchText);
      });
    }

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }

}
