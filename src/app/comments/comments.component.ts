import { Component, OnInit, Input, Output, OnChanges, EventEmitter,
  Directive, ViewContainerRef, ViewChildren, QueryList, ComponentFactoryResolver, AfterContentInit} from '@angular/core';
import { ChildboxComponent } from '../childbox/childbox.component';
import { CommonServiceService } from '../common-service.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[datacontainer]',
})
export class DatacontainerDirective  {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnChanges{
  @Input() postComment: Array<object> = [];
  @Output() countComments = new EventEmitter();
  public loadComponent = false;
  public commentIndex = 0;
  public reply: Array<object> = [];
  toggle ={};
  p: number = 1;

  // @ViewChildren decorator to grab elements from the host view
  /* The return type of ViewChildren is QueryList.
  QueryList is just a fancy name for an object that stores
  a list of items. What is special about this object is
  when the state of the application changes Angular will
  automatically update the object items for you. */
  @ViewChildren (DatacontainerDirective) entry: QueryList<DatacontainerDirective>;

  constructor(private resolver: ComponentFactoryResolver,public commonServiceService:CommonServiceService) { }

  ngOnInit() {
       this.commonServiceService.getCommentsData().subscribe(
      data => this.postComment = data)
  
  }


  ngOnChanges() {
    if (this.postComment !== undefined) {
      console.log('Main array====>', this.postComment);
    }
    this.setLocalStorage();
  }

  removeComment(no) {
    this.postComment.splice(no, 1);
    console.log('After remove array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }

  setLocalStorage(){
    localStorage.setItem('userName', 'Sam');
    localStorage.setItem('imageUrl','../../assets/images/loginuser.jpg')
  }

  replyComment(index) {
    this.loadComponent = true;
    const myFactory = this.resolver.resolveComponentFactory(ChildboxComponent);
    if (this.entry.toArray()[index].viewContainerRef.length <= 0 ) {
      const myRef = this.entry.toArray()[index].viewContainerRef.createComponent(myFactory);
      myRef.instance['commentNo'] = index;
      myRef.changeDetectorRef.detectChanges();
      myRef.instance.userReplycomment.subscribe(
        data => {
          console.log('Piyali=>', data);
          this.receiveReplyComment(data, index);
        }
      );
      myRef.instance.deletNo.subscribe(
        no => {
          myRef.destroy();
        }
      );
    }
  }

  receiveReplyComment($event, i) {
    this.reply = $event;
    console.log($event);
    this.postComment.forEach((element) => {
      if (element['commentId'] === i) {
        element['replyComment'].push(...$event);
        console.log('Main array after reply comment=>', this.postComment);
      }
    });
    console.log(this.reply);
    this.loadComponent = false;
  }

  likeComment(no) {
    this.postComment[no]['commentLikes'] =this.postComment[no]['commentLikes']+1
    console.log('After comment like array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }
  disLikeComment(no) {
    this.postComment[no]['commentDisLikes'] =this.postComment[no]['commentDisLikes']+1
    console.log('After comment dislike array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }

  childLikeComment(parentIndex,childIndex) {
    this.postComment[parentIndex]['replyComment'][childIndex]['commentLikes'] = this.postComment[parentIndex]['replyComment'][childIndex]['commentLikes']+1
    console.log('After child comment like array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }
  childDisLikeComment(parentIndex,childIndex) {
    this.postComment[parentIndex]['replyComment'][childIndex]['commentDisLikes'] =this.postComment[parentIndex]['replyComment'][childIndex]['commentDisLikes']+1
    console.log('After child comment dislike array====>', this.postComment);
    this.countComments.emit(this.postComment);
  }



}
