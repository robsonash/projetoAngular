import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  productsService = inject(ProductsService);
  matSnackBar = inject(MatSnackBar);
  product: Product = inject(ActivatedRoute).snapshot.data['product'];
  router = inject(Router);
  form = new FormGroup({
    title: new FormControl<string>(this.product.title.valueOf() || '', {
      nonNullable: true,
      validators: Validators.required,
    }),
  });

  onSubmit() {
    console.log('zdfnbdfbndf')
    this.productsService
      .put(this.product.id.valueOf() || '', {
        title: this.form.controls.title.value,
      })
      .subscribe(() => {
        this.matSnackBar.open('Produto editado com sucesso!', 'OK');
        this.router.navigateByUrl('/');
      });
  }
}
