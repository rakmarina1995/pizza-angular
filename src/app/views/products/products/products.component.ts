import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { tap} from "rxjs";
import {Router} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  public products: ProductType[] = [];
  loading:boolean=false;

  constructor(private productService: ProductService, private http: HttpClient,private router:Router) {
  }

  ngOnInit() {
    this.loading=true;
    this.productService.getProducts()
      .pipe(
        tap(()=>{this.loading=false})
      )
      .subscribe(
        {
          next: (data) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }


}
