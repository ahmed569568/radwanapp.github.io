import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { SearchService } from '../services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  result:any;
  constructor( private route: ActivatedRoute, private searchService: SearchService ) { }

  ngOnInit() {
    this.route.queryParams
    .filter(params => params.search)
    .subscribe(params => {
      //get query parameter search and call search end point
      this.searchService.search(params.search).subscribe((data:any) => {
        this.result = data;
      })
    })
  }
  mm(data) {
    console.log(data);
  }
  navigateProduct(id:any) {
    
     
  }
}
