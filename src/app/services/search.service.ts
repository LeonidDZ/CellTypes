import { Injectable } from "@angular/core";
import {Subject} from "rxjs";
import { SearchModel } from "../models/search.model";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SearchService {

    private dataPath: string = '../assets/data/data.json';
    public list: SearchModel[];

    public listChanged = new Subject<SearchModel[]>();

    constructor(private http: HttpClient) {
        this.readData();
     }

    readData() {
        this.http.get<SearchModel[]>(this.dataPath).subscribe((data) => {
            this.list = data;
            this.listChanged.next(this.list);
        })
    }
}