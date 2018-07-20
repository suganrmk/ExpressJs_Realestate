import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class CommonServices{

constructor(private http: Http) { }
  
      getAll(url) {
          return this.http.get(url).map((response: Response) => response.json());
      }
  
      getById(url) {
          return this.http.get(url).map((response: Response) => response.json());
      }
  
      create(url , data) {
          return this.http.post(url , data);
      }
  
      update(url , data) {
        return this.http.put(url, data);
      }
  
      delete(url) {
          console.log(url)
          return this.http.delete(url);
      }

}
