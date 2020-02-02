import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { PostAPI } from './posts.api';
import { Post } from '../models/post.model';


@Injectable()
export class PostsService {

  readonly errorHandler$: Subject<string> = new Subject();
  errorHandler = this.errorHandler$.asObservable();

  constructor(private postApi: PostAPI) {

  }

  getPosts(): Observable<Post[]> {
    return this.postApi.getPosts().pipe( map((fbPayload) => {
      const postsArray: Post[] = [];

      for (const key in fbPayload) {
        if (fbPayload.hasOwnProperty(key)) {
          postsArray.push({...fbPayload[key], id: key });
        }
      }
      return postsArray;

    }));
  }

  createPosts(postData: Post) {
    return this.postApi.createPost(postData).subscribe( () => {

      // _Fetch Data
    },
    (err: Error) => {
      return this.errorHandler$.next(err.message);
    });
  }

}
