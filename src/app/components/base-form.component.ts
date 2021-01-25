import { Injectable, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BaseComponent } from './base.component';
import { AppInjector } from '../services/injector.service';

@Injectable()
/* eslint-disable @angular-eslint/directive-class-suffix */
@Directive()
export abstract class BaseFormComponent extends BaseComponent {
  protected formBuilder: FormBuilder;

  public baseForm: FormGroup;
  public submitted = false;

  public initialValidation = false;

  constructor() {
    super();
    // Manually retrieve the dependencies from the injector
    // so that constructor has no dependencies that must be passed in from child
    const injector = AppInjector.getInjector();
    this.formBuilder = injector.get(FormBuilder);
  }

  /*   isFieldValid(field: string) {
      this.logger.info(field);
      if (this.baseForm) {
        if (!this.initialValidation) {
          return !this.baseForm.get(field).valid;
        } else {
          return (
            (!this.baseForm.get(field).valid && this.baseForm.get(field).touched) ||
            (this.baseForm.get(field).untouched && this.submitted)
          );
        }
      }
    } */

  validate() {
    this.submitted = true;
    if (this.baseForm.invalid) {
      return false; //Validation failed, exit from method.
    }

    this.loading = true;

    return true;
  }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url); // eslint-disable-line @typescript-eslint/no-floating-promises
  }

  handleSuccess(message: string, keep?: boolean, navURL?: string) {
    this.alertService.success(message, keep);
    if (navURL) {
      this.navigateByUrl(navURL);
    }

    this.loading = false;
  }
}
