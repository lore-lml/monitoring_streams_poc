import {WasteCollectionMsg} from './messages/waste-collection-msg.model';
import {ChannelReaderWrap} from './channel-reader-wrap.model';
import {ChannelItem} from '../folder/comp/channel-list/channel-list.component';

export class WasteCollectionChannel extends ChannelReaderWrap{
  msgs: WasteCollectionMsg[];

  constructor(channelId: string, announceId: string) {
    super(channelId, announceId);
    this.msgs = [];
  }


  async fetchMsg(){
    if (await this.reader.clone().fetch_raw_msgs()) {
      const decoder = new TextDecoder();
      while (this.reader.has_next_msg()){
        const response = decoder.decode(this.reader.pop_msg().public);
        const jsonObj = JSON.parse(response);

        const msg = new WasteCollectionMsg(
          jsonObj.license_plate,
          jsonObj.operator_id,
          jsonObj.max_weight,
          jsonObj.timestamp,
          jsonObj.last_update.latitude,
          jsonObj.last_update.longitude,
          jsonObj.last_update.weight,
        );
        this.msgs.push(msg);
      }
    }
  }

  getMsgs(): WasteCollectionMsg[] {
    return this.msgs;
  }

  get channelItem(): ChannelItem {
    const len = this.msgs.length;
    if (len === 0) {
      return null;
    }
    return {
      channelInfo: this.reader.channel_address(),
      icon: 'people-outline',
      title: len !== 0 ? this.msgs[0].operatorId : 'Unknown',
      subtitle: len !== 0 ? `Timestamp ${this.msgs[len-1].timestamp}` : 'Timestamp unknown'
    };
  }
}


