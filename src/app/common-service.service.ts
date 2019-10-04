import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private httpService: HttpClient) { }
  getCommentsData() : Observable<any> {
    return this.httpService.get("./assets/commentsData.json")
                 
}
}
