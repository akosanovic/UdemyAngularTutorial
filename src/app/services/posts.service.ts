import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PostAPI } from './posts.api';
import { Post } from '../models/post.model';


@Injectable()
export class PostsService {

  readonly errorHandler$: Subject<string> = new Subject();
  errorHandler = this.errorHandler$.asObservable();

  readonly postsSubj$: Subject<Post[]> = new Subject();
  posts$: Observable<Post[]> = this.postsSubj$.asObservable();

  constructor(private postApi: PostAPI) {

  }

  getPosts() {
    this.postApi.getPosts().pipe( map((fbPayload) => {
      const postsArray: Post[] = [];

      for (const key in fbPayload) {
        if (fbPayload.hasOwnProperty(key)) {
          postsArray.push({...fbPayload[key], id: key });
        }
      }
      // return postsArray;
      this.postsSubj$.next(postsArray);
    })).subscribe();
  }

  createPosts(postData: Post) {
    return this.postApi.createPost(postData).subscribe( () => {
      // fetch posts
      this.getPosts();
    },
    (err: Error) => {
      return this.errorHandler$.next(err.message);
    });
  }

  deletePosts() {
    return this.postApi.deletePosts();
  }
}
