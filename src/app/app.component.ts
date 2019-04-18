import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SubredditService } from './services/reddit.service';
import { HttpErrorResponse } from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';

export class RepliesNode {
  body : string;
  replies : RepliesNode [];
}

export class RepliesFlatNode {
  constructor(
     public expandable: boolean, public body: string, public level: number) {}
}
@Component({
  selector: 'redditCustomer',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  MyDataSource:any;
  commentObject:any;
  private redditSubscribe:any;
 
  subRedditName: string= "sweden";
  limit: string = "";
  before:string = "";
  after:string="";
  @Input()
  selftext: string = "";
  @Input()
  author: string = "";
  @Input()
  comments: string = "";
  @Input()
  title :string ="";

  constructor(private _service:SubredditService){
      this._service.getdata(this.subRedditName);
  };

  displayedColumns: string[] = ['thumbnail','created','num comments', 'author','score','permalink','title'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(){
    console.log("inside");
    this.getRedditData();                          
  };

  treeControl = new NestedTreeControl<RepliesNode>(node => node.replies);
  dataSource = new MatTreeNestedDataSource<RepliesNode>();


  fetchData(){
    this.getRedditData();
    this.clearData();
  }

  fetchDatawithParams(){
    this.getRedditDataWithParams();
    this.clearData();
  }

  clearData(){
    this.selftext = "";
    this.author = "";
    this.comments = ""; 
    this.commentObject = [];
  }

  editSelfText(row:any) {
   console.log("Row--> "+row.data.selftext+"--"+row.data.author);
   this.selftext = row.data.selftext;
   this.author = row.data.author;
   this.comments = row.data.permalink; 
   this.redditSubscribe = this._service.getComments(row.data.permalink).subscribe((pos_resp)=>{
   this.commentObject = pos_resp;
    
    console.log("result permalink--->"+this.commentObject);
  }, (err_resp:HttpErrorResponse) => {
      if (err_resp.error instanceof Error)
      {
        console.log("There was an error while loading SubReddit Data !!!");
      }else{
        console.log("There was an error while loading SubReddit Data from Server!!!");
      }
    });
     
  }

  getRedditData():any{
    console.log(this.subRedditName);
    if(this.limit.length >0 || this.before.length >0 || this.after.length >0 ){
      this.getRedditDataWithParams()
    }
    this.redditSubscribe = this._service.getRedditDetails(this.subRedditName).subscribe((pos_resp)=>{
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource.data = pos_resp.data.children;
      this.MyDataSource.paginator = this.paginator; 
      console.log("result--->"+this.MyDataSource);
    }, (err_resp:HttpErrorResponse) => {
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = [];
          this.MyDataSource.paginator = this.paginator; 
        if (err_resp.error instanceof Error)
        {
          console.log("There was an error while loading SubReddit Data !!!");
        }else{ 
          console.log("There was an error while loading SubReddit Data from Server!!!");
        }
      }); 
  }

  getRedditDataWithParams():any{
    console.log(this.subRedditName+"--"+this.limit+"--"+this.before+"--"+this.after);
    this.redditSubscribe = this._service.getRedditDetailswithParams(this.subRedditName,this.limit,this.before,this.after).subscribe((pos_resp)=>{
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource.data = pos_resp.data.children;
      this.MyDataSource.paginator = this.paginator; 
      console.log("result--->"+this.MyDataSource);
    }, (err_resp:HttpErrorResponse) => {
          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = [];
          this.MyDataSource.paginator = this.paginator; 
        if (err_resp.error instanceof Error)
        {
          console.log("There was an error while loading SubReddit Data !!!");
        }else{ 
          console.log("There was an error while loading SubReddit Data from Server!!!");
        }
      }); 
  }

  ngOnDestroy(){
    this.redditSubscribe.unsubscribe();
  };

  dataChange = new BehaviorSubject<RepliesNode[]>([]);
   get data(): RepliesNode[] { return this.dataChange.value; }
   
   commentsData:any;
   initialize() {
    -//const dataObject = JSON.parse(TREE_DATA);   
      this.buildFileTree(this.commentObject, 0);
     } 


   buildFileTree(obj: {[key: string]: any}, level: number): RepliesNode[] {
      return Object.keys(obj).reduce<RepliesNode[]>((accumulator, key) => {
         const value = obj[key];
         const node = new RepliesNode();
        // node.filename = key;
         if (value != null) {
            if (typeof value === 'object') {
          //     node.children = this.buildFileTree(value, level + 1);
            } else {
           //    node.type = value;
            }
         }
         return accumulator.concat(node);
      }, []);
   }
};
