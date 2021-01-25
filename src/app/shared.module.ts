import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// services
import { AlertService } from './services/';

@NgModule({
  declarations: [],
  imports: [FormsModule, ReactiveFormsModule],
  providers: [AlertService],
  exports: [FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
