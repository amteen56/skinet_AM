import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination-header',
  templateUrl: './pagination-header.component.html',
  styleUrls: ['./pagination-header.component.scss']
})
export class PaginationHeaderComponent implements OnInit {

  @Input() totalCount:number;
  @Input() pageSize:number;
  @Input() pageNumber:number;
  constructor() { }

  ngOnInit() {
  }

}
