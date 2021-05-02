import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChannelInfo,
  ChannelReader,
  ChannelReaderBuilder,
  ChannelWriter, ChannelWriterBuilder,
  KeyNonce,
  ResponseMessage
} from '../../../wasm/pkg';

interface Message {
  deviceId: string;
  operatorId: string;
  temperature: number;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  reader: ChannelReader;
  writer: ChannelWriter;

  constructor(private activatedRoute: ActivatedRoute) {

    this.writer = new ChannelWriterBuilder().build();

    /*this.sendDoubleMsg(this.writer).then(info => {
      this.reader = new ChannelReaderBuilder().build(info.channel_id(), info.announce_id());
      return this.attachAndGet(this.reader);
    })
      .then(msgs => {
      const decoder = new TextDecoder();
      msgs.forEach(value => {
        const p = decoder.decode(value.public);
        const m = decoder.decode(value.masked);
        console.log(`MsgId: ${value.msg_id}`);
        console.log(`Pub: ${p}`);
        console.log(`Private: ${m}`);
      });
    });*/
  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async sendDoubleMsg(writer: ChannelWriter){
    const key = 'This is a secret key';
    const nonce = 'This is a secret nonce';
    const keyNonce = new KeyNonce(key, nonce);
    const encoder = new TextEncoder();
    const info: ChannelInfo = await writer.clone().open();
    console.log(`${info.channel_id()}:${info.announce_id()}`);
    const pData: Message = {deviceId:'device1', operatorId:'operator1', temperature:12};
    const mData: Message = {deviceId:'device2', operatorId:'operator2', temperature:22};
    const pByte = JSON.stringify(pData);
    const mByte = JSON.stringify(mData);
    let msgId: string = await writer.clone().send_signed_raw_data(encoder.encode(pByte), encoder.encode(mByte), keyNonce);
    console.log(msgId);
    msgId = await writer.clone().send_signed_raw_data(encoder.encode(pByte), encoder.encode(mByte));
    console.log(msgId);
    return info;
  }

  async attachAndGet(reader: ChannelReader){
    const key = 'This is a secret key';
    const nonce = 'This is a secret nonce';
    const keyNonce = new KeyNonce(key, nonce);
    const msgs: ResponseMessage[] = [];
    await reader.clone().attach();
    if (await reader.clone().fetch_raw_msgs()) {
      while (reader.has_next_msg()){
        const m = reader.pop_msg(keyNonce);
        msgs.push(m);
      }
    }
    return msgs;
  }
}
