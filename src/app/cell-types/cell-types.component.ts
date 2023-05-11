import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-cell-types',
  templateUrl: './cell-types.component.html',
  styleUrls: ['./cell-types.component.css'],
  providers: [SearchService]
})
export class CellTypesComponent {

  public list: SearchModel[];
  public selectedList: SearchModel[];
  public searchInput: string;
  public searchBy: string;
  public props: string[];

public searchByProperty: string;


  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.searchService.listChanged.subscribe(inList => {
      this.list = inList;
      this.props = Object.keys(this.list[0]);
      this.searchChanged('');
      this.searchByChanged(this.props[0]);
    })
  }

  ngOnDestroy() {
    this.searchService.listChanged.unsubscribe();
  }

  searchChanged(event: string) {
    if (event === '') {
      this.selectedList = this.list;
    }
    else {
      let x = event.toLowerCase();
      this.selectedList = this.list.filter((sm: any) => {
        return sm[this.searchBy].toString().toLocaleLowerCase().indexOf(x) >= 0;
      })
    }
  }
  searchByChanged(val: string) {
    this.searchBy = val;
  }

  getColName(prop: string){
    var name: any = this.firstToUpper(prop);
    name = name.split(/(?=[A-Z])/).join(' ');
    return name;
  }

  firstToUpper(str: string){
    return str.substr(0,1).toUpperCase() + str.substring(1);
  }
}
