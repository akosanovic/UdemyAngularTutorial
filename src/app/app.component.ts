import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.model';
import { PostAPI } from './services/posts.api';
import { PostsService } from './services/posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;
  errorMessage$ = null;

  constructor(private postsApi: PostAPI,
              private postsService: PostsService,

    ) {}

  ngOnInit() {
    // No need to unsubscribe when using `| async` pipe in the template
    this.errorMessage$ = this.postsService.errorHandler;

    this._fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.createPosts(postData);
  }

  onFetchPosts() {
    this._fetchPosts();
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe(() => {
      this._fetchPosts();
    });
  }

  _fetchPosts() {
    this.isLoading = true;
    this.postsService.getPosts().subscribe( (posts: Post[]) => {
      this.isLoading = false;
      this.loadedPosts = posts;
    },
    (err: Error) => {
      this.postsService.errorHandler$.next(err.message);
    });

  }
}
