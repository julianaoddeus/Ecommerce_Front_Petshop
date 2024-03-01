import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, OnInit, Directive } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MaskDirective } from '../../../directives/mask.directive';
import { AppService } from '../../../services/app.service';
import { LoadingComponent } from "../../../components/shared/loading/loading.component";
import { CustomValidator } from '../../../validators/custom.validator.ts';
import { User } from '../../../models/user.model';
import { Security } from '../../../util/security.util';

@Component({
    selector: 'app-login-page',
    standalone: true,
    templateUrl: './login-page.component.html',
    imports: [ReactiveFormsModule, RouterLink, CommonModule, LoadingComponent, MaskDirective]
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public loading: boolean = false;

  constructor(
    private service : AppService,
    private fb: FormBuilder,
    private router: Router
    ){}

  ngOnInit(): void {
    this.formInit();
    this.refreshToken();
  }

  private formInit(){
    this.form = this.fb.group({
      username:['', Validators.compose([Validators.minLength(14), Validators.maxLength(14), Validators.required, CustomValidator.isCpf()])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20), Validators.required])]
    });
  }

  public submit () {
    this.loading = true;

    this.service.authenticate(this.form.value).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.setUser(data.customer, data.token);
    },
      error: (error: any) => {
        localStorage.clear();
        this.loading =  false;
      }
    })
  }

  public refreshToken(){
    const token = Security.getToken();
    if(token){
      this.loading = true;
      this.service.refreshToken().subscribe({
        next: (data: any) => {
          this.loading = false;
          this.setUser(data.customer, data.token);
      },
        error: (error: any) => {
          localStorage.clear();
          this.loading =  false;
        }
      })
    }
  }

  public setUser(user : User, token: any) {
    Security.set(user, token);
      this.router.navigate(['/']);
  }

}


