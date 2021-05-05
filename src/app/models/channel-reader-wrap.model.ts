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

  abstract async fetchMsg(): Promise<any>;
  abstract getMsgs(): Array<any>;
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
