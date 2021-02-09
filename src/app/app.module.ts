import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, ApplicationRef } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppInjector } from './services/injector.service';
import { SharedModule } from './shared.module';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header.component';
import { FooterComponent } from './components/layout/footer.component';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { PlayerComponent } from './components/player/player.component';
import { FileViewComponent } from './components/file-view/file-view.component';

import { ProgressBarComponent } from './widgets/progress-bar/progress-bar.component';
import { MessageAlertComponent } from './widgets/message-alert/message-alert.component';
import { VideoPlayerComponent } from './widgets/video-player/video-player.component';
import { PaginationLinkComponent } from './widgets/pagination-link/pagination-link.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

// directives
import { AutofocusDirective } from './directives/autofocus.directive';
import { FileSizePipe } from './pipes/filesize.pipe';
import { TruncateNamePipe } from './pipes/filename.pipe';

// Interceptor
import { ErrorInterceptor } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    MessageAlertComponent,
    ExplorerComponent,
    PlayerComponent,
    VideoPlayerComponent,
    PaginationLinkComponent,
    HeaderComponent,
    FooterComponent,
    FileSizePipe,
    TruncateNamePipe,
    AutofocusDirective,
    FileViewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    NgProgressModule.withConfig({
      trickleSpeed: 200,
      min: 20,
      meteor: false,
    }),
    NgProgressHttpModule.withConfig({
      silentApis: ['https://reqres.in'],
    }),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PdfViewerModule,
    NgxDocViewerModule,
  ],
  providers: [ErrorInterceptor],
  //bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  // use ngDoBootstrap instead of bootstrap to get injector
  ngDoBootstrap(applicationRef: ApplicationRef) {
    AppInjector.setInjector(this.injector);
    applicationRef.bootstrap(AppComponent);
  }
}
