import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AppInjector, LogService } from '../services';

@Injectable()
export abstract class BaseComponent {
  protected loading = false;

  // injected services
  protected router: Router;
  protected alertService: AlertService;
  protected logger: LogService;

  constructor() {
    // Manually retrieve the dependencies from the injector
    // so that constructor has no dependencies that must be passed in from child
    const injector = AppInjector.getInjector();
    this.router = injector.get(Router);
    // ActivatedRoute doesn't work in base classes your component extends.
    // see https://stackoverflow.com/questions/42947133/parent-components-gets-empty-params-from-activatedroute/42949015#42949015.
    //this.route = injector.get(ActivatedRoute);
    this.alertService = injector.get(AlertService);
    this.logger = injector.get(LogService);
  }

  public isLoading() {
    return this.loading;
  }

  protected asyncBegin() {
    this.loading = true;
  }
  protected asyncEnd() {
    this.loading = false;
  }

  protected handleSuccess(message: string) {
    this.logger.info(message);
    this.loading = false;
  }

  protected handleError(error: string) {
    this.logger.error(error);
    this.loading = false;
  }
}
