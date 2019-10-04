import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-commentbox',
  templateUrl: './commentbox.component.html',
  styleUrls: ['./commentbox.component.css']
})
export class CommentboxComponent implements OnInit {

  commentForm: FormGroup;
  commentInfo: Array<object> = [];
  submitted: Boolean = false;
  public id = 0;
  public imageUrl:String = "";
  public userName:String = "";
  public commentLikes = 0;
  public commentDisLikes = 0;
  @Output() usercomment = new EventEmitter();

  constructor(private formBuilder: FormBuilder,public commonServiceService:CommonServiceService) { }

  ngOnInit() {
    this.createForm();
    this.commonServiceService.getCommentsData().subscribe(
      data => this.commentInfo = data)
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return false;
    } else {
      this.commentInfo.push({
        commentId : this.id++,
        currentDate : new Date(),
        userName : this.userName,
        imageUrl : this.imageUrl,
        commentLikes : this.commentLikes,
        commentDisLikes : this.commentDisLikes,
        commentTxt: this.commentForm.controls['comment'].value,
        replyComment: []
      });
      this.usercomment.emit(this.commentInfo);
    }
  }


}
