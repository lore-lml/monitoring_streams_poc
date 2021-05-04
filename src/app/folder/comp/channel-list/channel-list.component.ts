import {Component, Input, OnInit} from '@angular/core';
import {ChannelInfo} from '../../../../../wasm/pkg';

export interface ChannelItem{
  channelInfo: ChannelInfo;
  icon: string;
  title: string;
  subtitle: string;
}
@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.scss'],
})
export class ChannelListComponent implements OnInit {

  @Input() items: ChannelItem[];

  constructor() { }

  ngOnInit() {}

  getUrl(item: ChannelItem){
    return `./channel/${item.channelInfo.channel_id()}`;
  }

}
