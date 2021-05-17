import {EventEmitter, Injectable} from '@angular/core';
import {ChannelInfo} from '../../../wasm/pkg';
import {WasteCollectionChannel} from '../models/waste-collection.model';
import {ScaleChannel} from '../models/scale.model';
import {BioCellChannel} from '../models/bio-cell.model';
import {ChannelReaderWrap} from '../models/channel-reader-wrap.model';
import {ChannelItem} from '../folder/comp/channel-list/channel-list.component';

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
    new ChannelInfo('06c6957c43ef3836046c829f38d9e3925b2dcf8dc59751c05e91036addb1016f0000000000000000', '91ad4b86988b45d04c669166'),
    new ChannelInfo('33b2316969376897056f0dfa1196814bc010c3e319e5817ed5c13f590f02d6d20000000000000000', '6326ed88f9cfc7deced291e8'),
  ];
  scaleChInfo = [
    new ChannelInfo('3e830cc51852171913e16d1caf8d631d92c0f6c5b90816809d6833fbf56abe740000000000000000', 'a561dc92570167dfc0a54beb'),
  ];
  bioChInfo = [
    new ChannelInfo('6add65811fb9769befc9d4b7be9a1c4a8e568afe2841f8ed5cee65970dbd58b20000000000000000', '6995372a5dbb3fcd94e709da'),
  ];

  wasteChannels: WasteCollectionChannel[];
  scaleChannels: ScaleChannel[];
  bioCellChannels: BioCellChannel[];

  wasteChItemsEventEmitter = new EventEmitter<ChannelItem[]>();
  scaleChItemsEventEmitter= new EventEmitter<ChannelItem[]>();
  bioCellChItemsEventEmitter= new EventEmitter<ChannelItem[]>();

  constructor(){
    this.wasteChannels = this.wasteChInfo.map(value => new WasteCollectionChannel(value.channel_id(), value.announce_id()));
    this.scaleChannels = this.scaleChInfo.map(value => new ScaleChannel(value.channel_id(), value.announce_id()));
    this.bioCellChannels = this.bioChInfo.map(value => new BioCellChannel(value.channel_id(), value.announce_id()));
    this.wasteChannels.map(value => this.initChannel(value)).forEach(value => value.then(() => {
      const items = this.wasteChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
      this.wasteChItemsEventEmitter.emit(items);
    }));
    this.scaleChannels.map(value => this.initChannel(value)).forEach(value => value.then(() => {
      const items = this.scaleChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
      this.scaleChItemsEventEmitter.emit(items);
    }));
    this.bioCellChannels.map(value => this.initChannel(value)).forEach(value => value.then(() => {
      const items = this.bioCellChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
      this.bioCellChItemsEventEmitter.emit(items);
    }));
  }

  async initChannel(channel: ChannelReaderWrap){
    await channel.attachChannel();
    await channel.fetchMsg();
    setInterval(async () => await channel.fetchMsg(),3000);
  }

  getChannelItems(type: ChannelsType){
    switch (type){
      case ChannelsType.wasteCollection:
        return this.wasteChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
      case ChannelsType.scales:
        return this.scaleChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
      case ChannelsType.bioCells:
        return this.bioCellChannels.map(ch => ch.channelItem).filter(ch => ch !== null);
    }
  }

  getChannelItemEvents(type: ChannelsType){
    switch (type){
      case ChannelsType.wasteCollection:
        return this.wasteChItemsEventEmitter;
      case ChannelsType.scales:
        return this.scaleChItemsEventEmitter;
      case ChannelsType.bioCells:
        return this.bioCellChItemsEventEmitter;
    }
  }

  getChannelMsgs(type: ChannelsType, channelId: string){
    switch (type){
      case ChannelsType.wasteCollection:
        const ch1 = this.wasteChannels.find(value => value.channelId === channelId);
        return ch1 === undefined ? [] : ch1.msgs;
      case ChannelsType.scales:
        const ch2 = this.scaleChannels.find(value => value.channelId === channelId);
        return ch2 === undefined ? [] : ch2.msgs;
      case ChannelsType.bioCells:
        const ch3 = this.bioCellChannels.find(value => value.channelId === channelId);
        return ch3 === undefined ? [] : ch3.msgs;
    }
  }

  getChannelMsgsEvents(type: ChannelsType, channelId: string): EventEmitter<Array<any>>{
    switch (type){
      case ChannelsType.wasteCollection:
        const ch1 = this.wasteChannels.find(value => value.channelId === channelId);
        return ch1 === undefined ? undefined : ch1.msgEvent;
      case ChannelsType.scales:
        const ch2 = this.scaleChannels.find(value => value.channelId === channelId);
        return ch2 === undefined ? undefined : ch2.msgEvent;
      case ChannelsType.bioCells:
        const ch3 = this.bioCellChannels.find(value => value.channelId === channelId);
        return ch3 === undefined ? undefined : ch3.msgEvent;
    }
  }

  timeConverter(timestamp: number): string{
    const a = new Date(timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    return `${date} ${month} ${year} ${hour}:${min}` ;
  }

}
