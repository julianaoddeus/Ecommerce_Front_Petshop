import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppService } from '../../../services/app.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';
import { CommonModule } from '@angular/common';
import { CustomValidator } from '../../../validators/custom.validator.ts';
import { MaskDirective } from '../../../directives/mask.directive';

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [MaskDirective, ReactiveFormsModule, LoadingComponent, CommonModule, RouterLink],
  templateUrl: './reset-password-page.component.html'
})
export class ResetPasswordPageComponent implements OnInit {
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
      document: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14), CustomValidator.isCpf()])]
    });
  }

  public submit() {
    this.loading = true;
    this.service.resetPassword(this.form.value).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.toastr.success(data.message, "Senha restaurada!");
        this.router.navigate(['/login']);
    },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro na sua requisição.' );
        console.log("R7187", error);
      }
    })
  }

}
