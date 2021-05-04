import {Component, OnInit} from '@angular/core';
import {ChannelItem} from '../../comp/channel-list/channel-list.component';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';

@Component({
  selector: 'app-waste-collection',
  templateUrl: './waste-collection.component.html',
  styleUrls: ['./waste-collection.component.scss'],
})
export class WasteCollectionComponent implements OnInit {

  items: ChannelItem[];
  constructor(private channelService: ChannelsService) {
    channelService.getChannels(ChannelsType.wasteCollection).then(items => this.items = items);
  }

  ngOnInit() {}

}
