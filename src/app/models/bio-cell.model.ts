import {BioCellMsg} from './messages/bio-cell-msg.model';
import {ChannelReaderWrap, MsgInfo} from './channel-reader-wrap.model';
import {ChannelItem} from '../folder/comp/channel-list/channel-list.component';

export class BioCellChannel extends ChannelReaderWrap{
  msgs: BioCellMsg[];

  constructor(channelId: string, announceId: string) {
    super(channelId, announceId);
    this.msgs = [];
  }

  async fetchMsg(): Promise<any> {
    if (await this.reader.clone().fetch_raw_msgs()) {
      const decoder = new TextDecoder();
      while (this.reader.has_next_msg()){
        const response = decoder.decode(this.reader.pop_msg().public);
        const jsonObj = JSON.parse(response);
        const msgInfo = new MsgInfo(
          jsonObj.scale_info.msg_info.channel_id,
          jsonObj.scale_info.msg_info.announce_id,
          jsonObj.scale_info.msg_info.msg_id);
        const msg = new BioCellMsg(
          jsonObj.plant,
          jsonObj.digestor_id,
          jsonObj.timestamp,
          jsonObj.measure.temperature,
          jsonObj.measure.humidity,
          jsonObj.scale_info.weight,
          msgInfo
        );
        this.msgs.push(msg);
      }
    }
  }

  getMsgs(): BioCellMsg[] {
    return this.msgs;
  }

  get channelItem(): ChannelItem{
    const len = this.msgs.length;
    if (len === 0) {
      return null;
    }
    return {
      channelInfo: this.reader.channel_address(),
      icon: 'scale-outline',
      title: len !== 0 ? this.msgs[0].digestorId : 'Unknown',
      subtitle: len !== 0 ? `Timestamp ${this.msgs[len-1].timestamp}` : 'Timestamp unknown'
    };
  }
}
