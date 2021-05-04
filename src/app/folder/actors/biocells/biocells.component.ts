import { Component, OnInit } from '@angular/core';
import {ChannelItem} from '../../comp/channel-list/channel-list.component';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';

@Component({
  selector: 'app-biocells',
  templateUrl: './biocells.component.html',
  styleUrls: ['./biocells.component.scss'],
})
export class BiocellsComponent implements OnInit {

  items: ChannelItem[];
  constructor(private channelService: ChannelsService) {
    channelService.getChannels(ChannelsType.bioCells).then(items => this.items = items);
  }

  ngOnInit() {}

}
