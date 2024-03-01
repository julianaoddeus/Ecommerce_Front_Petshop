import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../services/app.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../../components/store/product-card/product-card.component';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products-page.component.html',
})
export class ProductsPageComponent implements OnInit {
  public products$:Observable<Product[]> = new Observable<Product[]>(); //quando o retorno é assincrono pra lista usa-se o $ para identificar.

  constructor(private service: AppService) {}

  ngOnInit(): void {
    this.products$ = this.service.getProducts();
  }
}
