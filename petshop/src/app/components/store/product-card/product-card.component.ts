import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';
import { CartUtil } from '../../../util/cart.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() model!: Product;
  constructor(private toastr: ToastrService){}
  ngOnInit(): void {

  }

  addToCart(): void {
    CartUtil.add(
      this.model._id,
      this.model.title,
      1,
      this.model.price,
      this.model.images[0]
    )
    this.toastr.success(`${this.model.title} adicionado ao carrinho`, 'Produto Adicionado');
  }
}
