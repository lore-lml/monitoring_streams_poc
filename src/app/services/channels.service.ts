import { Injectable } from '@angular/core';
import {ChannelInfo} from '../../../wasm/pkg';

export enum ChannelsType {
  wasteCollection,
  scales,
  bioCells
}

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  wasteCollection = [
    {
      channelInfo: new ChannelInfo('1', ''),
      icon: 'people-outline',
      title: 'Operatore 1',
      subtitle: 'Ultimo aggiornamento 2 min fa',
    },
    {
      channelInfo: new ChannelInfo('1', ''),
      icon: 'people-outline',
      title: 'Operatore 2',
      subtitle: 'Ultimo aggiornamento 31 min fa',
    },
  ];

  scales = [
    {
      channelInfo: new ChannelInfo('1', ''),
      icon: 'scale-outline',
      title: 'P1',
      subtitle: 'Ultimo aggiornamento 2 min fa',
    },
    {
      channelInfo: new ChannelInfo('1', ''),
      icon: 'scale-outline',
      title: 'P2',
      subtitle: 'Ultimo aggiornamento 31 min fa',
    },
  ];

  bioCells = [
    {
      channelInfo: new ChannelInfo('1', ''),
      icon: 'leaf-outline',
      title: 'Cella 1',
      subtitle: 'Ultimo aggiornamento 2 min fa',
    },
    {
      channelInfo: new ChannelInfo('1', ''),
      icon: 'leaf-outline',
      title: 'Cella 2',
      subtitle: 'Ultimo aggiornamento 31 min fa',
    },
  ];

  constructor() {}

  async getChannels(type: ChannelsType){
    switch (type){
      case ChannelsType.wasteCollection:
        return this.wasteCollection;
      case ChannelsType.scales:
        return this.scales;
      case ChannelsType.bioCells:
        return this.bioCells;
    }
  }
}
