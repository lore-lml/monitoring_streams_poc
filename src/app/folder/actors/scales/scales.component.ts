import { Component, OnInit } from '@angular/core';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';

@Component({
  selector: 'app-scales',
  templateUrl: './scales.component.html',
  styleUrls: ['./scales.component.scss'],
})
export class ScalesComponent implements OnInit {

  constructor(private channelService: ChannelsService) {
  }

  getItems(){
    return this.channelService.getChannels(ChannelsType.scales);
  }

  ngOnInit() {}

}
