import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/account/login-page/login-page.component';
import { SignupPageComponent } from './pages/account/signup-page/signup-page.component';
import { ResetPasswordPageComponent } from './pages/account/reset-password-page/reset-password-page.component';
import { PetsPageComponent } from './pages/account/pets-page/pets-page.component';
import { CartPageComponent } from './pages/store/cart-page/cart-page.component';
import { FramePageComponent } from './pages/master/frame-page/frame-page.component';
import { ProductsPageComponent } from './pages/store/products-page/products-page.component';
import { CheckoutPageComponent } from './pages/store/checkout-page/checkout-page.component';
import { AuthService } from './services/auth.service';
import { ProfilePageComponent } from './pages/account/profile-page/profile-page.component';

export const routes: Routes = [
  { path: '', component: FramePageComponent,
      children:[
        { path: '', component: ProductsPageComponent },
        { path: 'cart', component: CartPageComponent, canActivate:[AuthService] },
        {path: 'checkout', component: CheckoutPageComponent, canActivate:[AuthService] },
    ]
  },
  { path: 'account', component: FramePageComponent,
      canActivate:[AuthService],
      children:[
        {path: '', component: ProfilePageComponent },
        {path: 'pets', component: PetsPageComponent},
      ]
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'reset-password', component: ResetPasswordPageComponent },
];