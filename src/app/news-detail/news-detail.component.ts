import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  id: any;
  title: string;
  date: string;
  html: any;
  constructor(public activeRoute: ActivatedRoute, public data: DataService, public http: HttpService) {
    this.id = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.newDetail();
  }

  newDetail() {
    this.http.newsDetail(this.id).subscribe(res => {
      this.title = res['title'];
      this.date = res['createTime'];
      this.html = res['body'];
    }, err => {
      this.data.error = err.error;
      this.data.isError();
    });
  }

  back() {
    this.data.back();
  }

}
