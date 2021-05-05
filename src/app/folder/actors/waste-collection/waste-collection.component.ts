import {Component, OnInit} from '@angular/core';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';

@Component({
  selector: 'app-waste-collection',
  templateUrl: './waste-collection.component.html',
  styleUrls: ['./waste-collection.component.scss'],
})
export class WasteCollectionComponent implements OnInit {

  constructor(private channelService: ChannelsService) {}

  getItems(){
    return this.channelService.getChannels(ChannelsType.wasteCollection);
  }

  ngOnInit() {}

}
