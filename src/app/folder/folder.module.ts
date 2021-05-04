import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import {WasteCollectionComponent} from './actors/waste-collection/waste-collection.component';
import {ChannelListComponent} from './comp/channel-list/channel-list.component';
import {ChannelInfoComponent} from './comp/channel-info/channel-info.component';
import {ScalesComponent} from './actors/scales/scales.component';
import {BiocellsComponent} from './actors/biocells/biocells.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule
  ],
  declarations: [FolderPage, WasteCollectionComponent, ChannelListComponent, ChannelInfoComponent, ScalesComponent, BiocellsComponent]
})
export class FolderPageModule {}
