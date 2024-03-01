import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { CustomValidator } from '../../../validators/custom.validator.ts';
import { MaskDirective } from '../../../directives/mask.directive';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [MaskDirective, ReactiveFormsModule, LoadingComponent, CommonModule, RouterLink],
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit{
  public form!: FormGroup;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private service: AppService,
    private fb: FormBuilder,
    private toastr: ToastrService
  )
  {}

  ngOnInit() {
    this.formInit();
  }

  private formInit() {
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(80)])],
      document: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14), CustomValidator.isCpf()])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(120), Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]
    });
  }

  public submit(): void {
    this.loading = true;
    this.service.create(this.form.value).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.toastr.success(data.message, "Bem-vindo!");
        this.router.navigate(['/login']);
    },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro na sua requisição.');
        console.log("S7187", error);
      }
    })
  }
}

