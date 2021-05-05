import { Component, OnInit } from '@angular/core';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';

@Component({
  selector: 'app-biocells',
  templateUrl: './biocells.component.html',
  styleUrls: ['./biocells.component.scss'],
})
export class BiocellsComponent implements OnInit {

  constructor(private channelService: ChannelsService) {
  }

  getItems(){
    return this.channelService.getChannels(ChannelsType.bioCells);
  }

  ngOnInit() {}

}
