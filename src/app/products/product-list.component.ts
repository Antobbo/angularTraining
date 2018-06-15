import { Component, OnInit } from '@angular/core';
import {IProduct} from './product';
import {ProductService} from "./product.service";

@Component({

  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit{
  pageTitle: string = 'This is the title of the page';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  filteredProducts: IProduct[];
  get listFilter(): string
  {
    return this._listFilter;
  }
  set listFilter(value:string)
  {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }
  products: IProduct[] = [];
  constructor(private _productService: ProductService)
  {
    //this.listFilter = 'cart';

  }
  onRatingClicked(message: string): void
  {
    this.pageTitle = 'Product List: ' + message;
  }
  performFilter(filterBy: string): IProduct[]
  {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void{
    this.showImage = !this.showImage;
    console.log(this.showImage);
  }

  ngOnInit(): void
  {
    console.log('In OnInit');
    this.products = this._productService.getProducts();
    this.filteredProducts = this.products;
  }
}
