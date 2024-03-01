import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../components/shared/loading/loading.component';
import { CustomValidator } from '../../../validators/custom.validator.ts';
import { MaskDirective } from '../../../directives/mask.directive';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  imports: [ReactiveFormsModule, RouterLink, CommonModule, LoadingComponent, MaskDirective]
})
export class ProfilePageComponent implements OnInit {

  public form!: FormGroup;
  public loading: boolean = false;

  constructor(
    private router: Router,
    private service: AppService,
    private fb: FormBuilder,
    private toastr: ToastrService
    ){}

  ngOnInit() {
    this.formInit();
    this.getProfile();
  }

  private formInit(){
    this.form = this.fb.group({
      document: [{ value: '', disabled: true }],
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(80)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(120), Validators.email])],
    });
  }

  public submit(): void {
    this.loading = true;
    this.service.updateProfile(this.form.value).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.toastr.success(data.message, "Atualização Completa!");
        this.router.navigate(['/login']);
    },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro na sua requisição.');
        console.log("S7187", error);
      }
    })
  }

  private getProfile() {
    this.loading = true;
    this.service.getProfile().subscribe({
      next: (data: any) => {
        this.loading = false;
        this.form.controls['name'].setValue(data.name);
        this.form.controls['document'].setValue(data.document.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'));
        this.form.controls['email'].setValue(data.email);
    },
      error: (error: any) => {
        this.loading = false;
        this.toastr.error('Ocorreu um erro na sua requisição.');
        console.log("P7187", error);
      }
    })
  }

}
