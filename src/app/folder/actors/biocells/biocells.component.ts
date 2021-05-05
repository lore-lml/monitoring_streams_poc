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
  constructor(private channelService: ChannelsService) {}

  ngOnInit() {
    this.items = this.channelService.getChannelItems(ChannelsType.bioCells);
    this.itemSub = this.channelService.getChannelItemEvents(ChannelsType.bioCells)
      .subscribe(items => this.items = items);
  }

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }

}
