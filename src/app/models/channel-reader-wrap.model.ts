import {ChannelReader, ChannelReaderBuilder} from '../../../wasm/pkg';
import {ChannelItem} from '../folder/comp/channel-list/channel-list.component';

export abstract class ChannelReaderWrap {
  reader: ChannelReader;

  protected constructor(channelId: string, announceId: string) {
    this.reader = new ChannelReaderBuilder().build(channelId, announceId);
  }

  async attachChannel(){
    return await this.reader.clone().attach();
  }

  get channelId(){
    return this.reader.channel_address().channel_id();
  }

  get announceId(){
    return this.reader.channel_address().announce_id();
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

  abstract async fetchMsg(): Promise<any>;
  abstract get channelItem(): ChannelItem;
}

export class MsgInfo{
  channelId: string;
  announceId: string;
  msgId: string;

  constructor(channelId: string, announceId: string, msgId: string) {
    this.channelId = channelId;
    this.announceId = announceId;
    this.msgId = msgId;
  }
}
