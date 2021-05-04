import { Component, OnInit } from '@angular/core';
import {ChannelItem} from '../../comp/channel-list/channel-list.component';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss'],
})
export class ScalesComponent implements OnInit {

  items: ChannelItem[];
  constructor(private channelService: ChannelsService) {
    channelService.getChannels(ChannelsType.scales).then(items => this.items = items);
  }

  ngOnInit() {}

}
