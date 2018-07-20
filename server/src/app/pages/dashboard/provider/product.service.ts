// ./angular-client/src/app/product/product.service.ts
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {
  private productApi = '/product/';
  
  showAddProductBox:boolean = true;

  constructor(private http: Http){ }

 getProducts(): Promise<any>{
    console.log('products')
      return this.http.get(this.productApi)
                 .toPromise()
                 .then(this.handleData)
                 .catch(this.handleError)
  }

  getProduct(id:string): Promise<any>{
    return this.http.get(this.productApi + id)
                    .toPromise()
                    .then(this.handleData)
                    .catch(this.handleError)
  }

  getslider(url): Promise<any>{
    return this.http.get(url)
                    .toPromise()
                    .then(this.handleData)
                    .catch(this.handleError)
  }

  createProduct(product:any): Promise<any>{
    return this.http.post(this.productApi, product)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleError )
  }

  updateProduct(product: any): Promise<any> {
    return this.http
               .put(this.productApi, product)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleData);
  }

  deleteProduct(product: any): Promise<any> {
    return this.http
               .delete(this.productApi + product._id)
               .toPromise()
               .then(this.handleData)
               .catch(this.handleError);
  }

  private handleData(res: any) {
       let body = res.json();
       console.log(body); // for development purposes only
       return body || {};
   }

 private handleError(error: any): Promise<any> {
     console.error('An error occurred', error); // for development purposes only
     return Promise.reject(error.message || error);
 }


 

}
