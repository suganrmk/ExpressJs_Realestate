// ./angular-client/src/app/product/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';

import { ProductService } from '../provider/product.service';
import { CommonService } from '../../providers/index';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // product: any = {};
  products: any[] = [];

  selectedRow: any;

  constructor(private productService: ProductService ,  private commonServices: CommonService) { 
     }

  ngOnInit(): void {
    this.commonServices.getAll('/route/allproducts').subscribe(td => { 
      this.products = td.products;   console.log(this.products) 
    });
  
  }

  onDeleteSlider(val) {
    this.commonServices.delete('/route/products/' + val._id).subscribe(res => {
      const index = this.findSelectedRowIndex();
      this.products = this.products.filter((data, i) => i !== index);
    });
  }
  findSelectedRowIndex(): number {
    return this.products.indexOf(this.selectedRow);
  }


}
