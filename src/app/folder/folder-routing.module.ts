import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolderPage } from './folder.page';
import {ChannelInfoComponent} from './comp/channel-info/channel-info.component';

const routes: Routes = [
  {
    path: '',
    component: FolderPage
  },
  {
    path: 'channel/:id',
    component: ChannelInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolderPageRoutingModule {}
