import {ScaleMsg} from './messages/scale-msg.model';
import {ChannelReaderWrap} from './channel-reader-wrap.model';
import {ChannelItem} from '../folder/comp/channel-list/channel-list.component';
import {EventEmitter} from '@angular/core';


export class ScaleChannel extends ChannelReaderWrap{
  msgs: ScaleMsg[];
  msgEventEmitter: EventEmitter<ScaleMsg[]>;

  constructor(channelId: string, announceId: string) {
    super(channelId, announceId);
    this.msgs = [];
    this.msgEventEmitter = new EventEmitter();
  }

  async fetchMsg(){
    if (await this.reader.clone().fetch_raw_msgs()) {
      const decoder = new TextDecoder();
      while (this.reader.has_next_msg()){
        const response = decoder.decode(this.reader.pop_msg().public);
        const jsonObj = JSON.parse(response);
        const msg = new ScaleMsg(
          jsonObj.plant,
          jsonObj.timestamp,
          jsonObj.truck_info.license_plate,
          jsonObj.truck_info.operator_id,
          jsonObj.truck_info.weight,
          jsonObj.truck_info.msg_info.channel_id,
          jsonObj.truck_info.msg_info.announce_id,
          jsonObj.truck_info.msg_info.msg_id,
        );
        this.msgs.push(msg);
      }
    }
  }

  get channelItem(): ChannelItem{
    const len = this.msgs.length;
    if (len === 0) {
      return null;
    }
    return {
      channelInfo: this.reader.channel_address(),
      icon: 'scale-outline',
      title: len !== 0 ? this.msgs[0].plant : 'Unknown',
      subtitle: len !== 0 ? `Ultimo Aggiornamento: ${this.timeConverter(this.msgs[len-1].timestamp)}` : 'Timestamp unknown'
    };
  }

  get msgEvent(): EventEmitter<ScaleMsg[]>{
    return this.msgEventEmitter;
  }
}
