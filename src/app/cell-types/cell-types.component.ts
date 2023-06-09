import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { SearchModel } from '../models/search.model';
import { SearchService } from '../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cell-types',
  templateUrl: './cell-types.component.html',
  styleUrls: ['./cell-types.component.css'],
  providers: [SearchService]
})
export class CellTypesComponent implements OnInit, OnDestroy {

  public list: SearchModel[];
  public selectedList: SearchModel[];
  public searchInput: string;
  public searchBy: string;
  public props: string[];
  private listChangedSubscription: Subscription;

  public searchByProperty: string;
  @ViewChild('sIn') sIn: ElementRef;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  this.listChangedSubscription = this.searchService.listChanged.subscribe(inList => {
      this.list = inList;
      this.props = Object.keys(this.list[0]);
      this.searchChanged('');
      this.searchByChanged(this.props[0]);
    })
  }

  ngOnDestroy() {
    this.listChangedSubscription.unsubscribe();
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
    this.clearSelect();
  }

  getColName(prop: string) {
    var name: any = this.firstToUpper(prop);
    name = name.split(/(?=[A-Z])/).join(' ');
    return name;
  }

  firstToUpper(str: string) {
    return str.substr(0, 1).toUpperCase() + str.substring(1);
  }

  clearSelect() {
    this.sIn.nativeElement.value = '';
    this.searchChanged('');
  }
}
