import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostAPI } from './posts.api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;

  constructor(private postsApi: PostAPI) {}

  ngOnInit() {
    this._fetchPosts();
  }

  onCreatePost(postData: Post) {
   this.postsApi.createPost(postData).subscribe( () => {
     this._fetchPosts();
   });
  }

  onFetchPosts() {
    this._fetchPosts();
  }

  onClearPosts() {
    this.postsApi.deletePosts().subscribe( () => {
      this._fetchPosts();
    });
  }

  _fetchPosts() {
    this.isLoading = true;
    this.postsApi.getPosts().subscribe( (posts: Post[]) => {
      this.isLoading = false;
      this.loadedPosts = posts;
    });

  }
}
