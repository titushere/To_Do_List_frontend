import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput:string='';
  @Output() 
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  search() {
  //  console.log(this.searchInput);
    this.searchTextChanged.emit(this.searchInput);
  }
}
