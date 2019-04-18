import { Injectable } from "@angular/core" ;
import { HttpClient, HttpParams } from "@angular/common/http";
//import { Observable }   from 'rxjs/Observable';
//import 'rxjs/add/operator/map';

@Injectable()

export class SubredditService {
    constructor (private _http:HttpClient) {
        
    }    
    public getdata(data:string){
        console.log(data);
    }
    public getRedditDetails(data:string):any{
        console.log(data);
        return this._http.get("https://www.reddit.com/r/"+data+".json");
    }

    public getRedditDetailswithParams(data:string,limit:string,before:string,after:string):any{
        if(limit==="0" || limit === undefined){
            limit = "25";
        }
        console.log(data+"---"+limit+"----"+after+"---"+before);
        return this._http.get("https://www.reddit.com/r/"+data+".json",{
            params: new HttpParams()
                .set('limit', limit)
                .set('before', before)
                .set('after', after)
        });
    }

    public getComments(data:string):any{
        console.log("comment link https://www.reddit.com"+data+".json" );
        return this._http.get("https://www.reddit.com"+data+".json");
    }
};