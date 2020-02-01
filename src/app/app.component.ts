import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  readonly POST_URL = 'https://chronoplanner.firebaseio.com/posts.json';
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this._fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post<{name: string}>(this.POST_URL, JSON.stringify(postData)).subscribe( (resp) => {
      console.log('resp', resp);
    });
  }

  onFetchPosts() {
    this._fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  _fetchPosts() {
    this.isLoading = true;
    this.http.get<{[keyId: string]: Post}>(this.POST_URL).pipe( map ((fbPayload) => {
      const postsArray: Post[] = [];

      for (const key in fbPayload) {
        if (fbPayload.hasOwnProperty(key)) {
          postsArray.push({...fbPayload[key], id: key });
        }
      }
      return postsArray;

    })).subscribe( (posts: Post[]) => {
      this.isLoading = false;
      this.loadedPosts = posts;
    });
  }
}
