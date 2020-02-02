import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable()
export class PostAPI {
  readonly POST_URL = 'https://chronoplanner.firebaseio.com/posts.json';
  constructor(private http: HttpClient) {}

  getPosts() {
   return this.http.get<{[keyId: string]: Post}>(this.POST_URL);
  }

  createPost(postData: Post): Observable<{name: string}> {
    return this.http.post<{name: string}>(this.POST_URL, JSON.stringify(postData));
  }

  deletePosts(): Observable<any> {
    return this.http.delete(this.POST_URL);
  }
}