import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';
import {ChannelItem} from '../../comp/channel-list/channel-list.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-waste-collection',
  templateUrl: './waste-collection.component.html',
  styleUrls: ['./waste-collection.component.scss'],
})
export class WasteCollectionComponent implements OnInit, OnDestroy {

  items: ChannelItem[];
  itemSub: Subscription;
  constructor(private channelService: ChannelsService) {}

  ngOnInit() {
    this.items = this.channelService.getChannelItems(ChannelsType.wasteCollection);
    this.itemSub = this.channelService.getChannelItemEvents(ChannelsType.wasteCollection)
      .subscribe(items => this.items = items);
  }

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }
}
