import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  comments: string;
  count: number;
  
  constructor(public commonServiceService:CommonServiceService) { }

  ngOnInit() {
    this.commonServiceService.getCommentsData().subscribe(
      data => this.count = data.length)
  }

  receiveComment($event) {
    this.comments = $event;
    this.count = this.comments.length;
    console.log(this.comments.length);
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }

}
