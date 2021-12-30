import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _api:HttpClient) { }

  postData(value:any ){
    return this._api.post('http://localhost:3000/posts',value)
   }
   getdata(){
     return this._api.get('http://localhost:3000/posts')
   }
   postdata(data:any){
     return this._api.post("http://localhost:3000/posts",data)
       }
       getData(){
         return this._api.get("http://localhost:3000/posts")
       }
     
       delete(id:number){
         return this._api.delete("http://localhost:3000/posts/"+id)
       }
}
