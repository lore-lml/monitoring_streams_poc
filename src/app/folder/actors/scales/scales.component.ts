import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';
import {ChannelItem} from '../../comp/channel-list/channel-list.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss'],
})
export class ScalesComponent implements OnInit, OnDestroy {

  items: ChannelItem[];
  itemSub: Subscription;
  constructor(private channelService: ChannelsService) {}

  ngOnInit() {
    this.items = this.channelService.getChannelItems(ChannelsType.scales);
    this.itemSub = this.channelService.getChannelItemEvents(ChannelsType.scales)
      .subscribe(items => this.items = items);
  }

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }

}
