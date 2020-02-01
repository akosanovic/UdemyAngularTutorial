import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class PostAPI {
  readonly POST_URL = 'https://chronoplanner.firebaseio.com/posts.json';
  constructor(private http: HttpClient) {}

  getPosts() {
   return this.http.get<{[keyId: string]: Post}>(this.POST_URL)
    .pipe( map((fbPayload) => {
      const postsArray: Post[] = [];

      for (const key in fbPayload) {
        if (fbPayload.hasOwnProperty(key)) {
          postsArray.push({...fbPayload[key], id: key });
        }
      }
      return postsArray;

    }));
  }

  createPost(postData: Post): Observable<{name: string}> {
    return this.http.post<{name: string}>(this.POST_URL, JSON.stringify(postData));
  }

  deletePosts(): Observable<any> {
    return this.http.delete(this.POST_URL);
  }
}