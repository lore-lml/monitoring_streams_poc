import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';
import {ChannelItem} from '../../comp/channel-list/channel-list.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-biocells',
  templateUrl: './biocells.component.html',
  styleUrls: ['./biocells.component.scss'],
})
export class BiocellsComponent implements OnInit, OnDestroy {

  items: ChannelItem[];
  itemSub: Subscription;
  constructor(private channelService: ChannelsService) {
    this.items = channelService.getChannelItems(ChannelsType.bioCells);
    this.itemSub = channelService.getChannelEvents(ChannelsType.bioCells)
      .subscribe(items => this.items = items);
  }

  getItems(){
    return this.channelService.getChannelEvents(ChannelsType.bioCells);
  }

  ngOnInit() {}

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }

}
