import { Component, OnInit } from '@angular/core';
import { Cart } from '../../../models/cart.model';
import { CartUtil } from '../../../util/cart.util';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html'
})
export class  CartPageComponent implements OnInit {

  public cart: Cart = new Cart();

  constructor(){}

  ngOnInit(): void {
    this.loadCart();    
  }

  public loadCart(): void {
    this.cart = CartUtil.get();    
  }

  public removeItem(item: any){
    let index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
  }

  public total(): number{
    let total = 0;
    this.cart.items.forEach((item: any) =>{
      total += (item.price * item.quantity);
    })
    return total;
  }
}
