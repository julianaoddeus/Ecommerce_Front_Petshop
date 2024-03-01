import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../../../models/user.model';
import { Security } from '../../../util/security.util';
import { CartUtil } from '../../../util/cart.util';
import { Cart } from '../../../models/cart.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  public user! : User | null;
  public cart! : Cart | null;
  public itemsToCart: number = 0;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.user = Security.getUser();  
    this.quantityItemsToCart(); 
  }

  public logout(): void {
    Security.clear();
    this.router.navigate(['/login']);
  }

  public quantityItemsToCart(): void {
    this.cart = CartUtil.get();
    this.itemsToCart =  this.cart.items.length;
  }
}
