import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorerComponent } from './components/explorer/explorer.component';
import { PlayerComponent } from './components/player/player.component';
import { FileViewComponent } from './components/file-view/file-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExplorerComponent,
  },
  {
    path: 'explorer',
    component: ExplorerComponent,
  },
  {
    path: 'explorer/:url',
    component: ExplorerComponent,
  },
  {
    path: 'player',
    component: PlayerComponent,
  },
  {
    path: 'player/:url',
    component: PlayerComponent,
  },
  {
    path: 'view/:url',
    component: FileViewComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
