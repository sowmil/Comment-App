import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-childbox',
  templateUrl: './childbox.component.html',
  styleUrls: ['./childbox.component.css']
})
export class ChildboxComponent implements OnInit {

  childForm: FormGroup;
  replyComment: Array<object> = [];
  public imageUrl:String = "../../assets/images/loginuser.jpg";
  public userName:String = "Sam";
  public commentLikes = 0;
  public commentDisLikes = 0;
  submitted: Boolean = false;
  @Output() userReplycomment = new EventEmitter();
  @Output() deletNo = new EventEmitter();
  @Input() commentNo: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    console.log('Comment no==>', this.commentNo);
  }

  createForm() {
    this.childForm = this.formBuilder.group({
      comment: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.childForm.invalid) {
      return false;
    } else {
      this.replyComment.push({
        currentDate : new Date(),
        userName : this.userName,
        imageUrl : this.imageUrl,
        commentLikes : this.commentLikes,
        commentDisLikes : this.commentDisLikes,
        commentTxt: this.childForm.controls['comment'].value
      });
      this.userReplycomment.emit(this.replyComment);
      this.deletNo.emit(this.commentNo);
    }
  }

}
