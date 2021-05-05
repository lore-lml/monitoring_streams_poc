import {Injectable} from '@angular/core';
import {ChannelInfo} from '../../../wasm/pkg';
import {WasteCollectionChannel} from '../models/waste-collection.model';
import {ScaleChannel} from '../models/scale.model';
import {BioCellChannel} from '../models/bio-cell.model';
import {ChannelReaderWrap} from '../models/channel-reader-wrap.model';

export enum ChannelsType {
  wasteCollection,
  scales,
  bioCells,
}

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  wasteChInfo = [
    new ChannelInfo('b90ce003cde9818368a878943aa98b374549f90d486ac467b8dc18b70d3f3f5e0000000000000000', 'b29dd09befb3312dcc6aa3d6'),
    new ChannelInfo('bbe0bf4ea1ddead960e2caa65ccc9bf8e035957804f2a9728fcf9251d5ab644d0000000000000000', '2636031913bcb5548e17a289'),
  ];
  scaleChInfo = [
    new ChannelInfo('d2f381bd5f61e0b203221f24bb2e1026f74b53dc42d4c273f1a8d45c41262a9e0000000000000000', '3d3a08bbd9cb16b1f4c3072a'),
  ];
  bioChInfo = [
    new ChannelInfo('9c51fe17b591a2b89791bbced7d672e53f0da4caeedcac12d361cea9562e71ba0000000000000000', '3771422feb7b13dcb6eefda9'),
  ];

  wasteChannels: WasteCollectionChannel[];
  scaleChannels: ScaleChannel[];
  bioCellChannels: BioCellChannel[];

  constructor(){
    this.wasteChannels = this.wasteChInfo.map(value => new WasteCollectionChannel(value.channel_id(), value.announce_id()));
    this.scaleChannels = this.scaleChInfo.map(value => new ScaleChannel(value.channel_id(), value.announce_id()));
    this.bioCellChannels = this.bioChInfo.map(value => new BioCellChannel(value.channel_id(), value.announce_id()));
    this.wasteChannels.map(value => this.initChannel(value)).forEach(value => value.then());
    this.scaleChannels.map(value => this.initChannel(value)).forEach(value => value.then());
    this.bioCellChannels.map(value => this.initChannel(value)).forEach(value => value.then());
  }

  async initChannel(channel: ChannelReaderWrap){
    await channel.attachChannel();
    await channel.fetchMsg();
  }

  getChannels(type: ChannelsType){
    switch (type){
      case ChannelsType.wasteCollection:
        return this.wasteChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
      case ChannelsType.scales:
        return this.scaleChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
      case ChannelsType.bioCells:
        return this.bioCellChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
    }
  }
}
