import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/service/data.service';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {


  data: string ='';

  constructor(public service: DataService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.data);
    this.service.data=this.data;
  }
}
