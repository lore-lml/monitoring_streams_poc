import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChannelsService, ChannelsType} from '../../../services/channels.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-channel-info',
  templateUrl: './channel-info.component.html',
  styleUrls: ['./channel-info.component.scss'],
})
export class ChannelInfoComponent implements OnInit, OnDestroy {

  channelType: ChannelsType;
  channelTypeName: string;
  channelId: string;
  msgSub: Subscription;
  msgs: Array<any>;
  dataShowed: boolean[];
  toShow: number;
  constructor(private activatedRoute: ActivatedRoute, private channelService: ChannelsService) {}

  ngOnInit() {
    this.toShow = -1;
    this.channelTypeName = this.activatedRoute.snapshot.parent.paramMap.get('id');
    switch (this.channelTypeName.toLocaleLowerCase()){
      case 'raccolta':
        this.channelType = ChannelsType.wasteCollection;
        break;
      case 'pesata':
        this.channelType = ChannelsType.scales;
        break;
      case 'biocelle':
        this.channelType = ChannelsType.bioCells;
        break;
    }
    this.channelId = this.activatedRoute.snapshot.paramMap.get('id');
    this.msgs = this.channelService.getChannelMsgs(this.channelType, this.channelId);
    this.dataShowed = this.msgs.map(value => false);
    this.msgSub = this.channelService.getChannelMsgsEvents(this.channelType, this.channelId)
      .subscribe(msgs => this.msgs = msgs);
  }

  ngOnDestroy(): void {
    this.msgSub.unsubscribe();
  }

  toJson(msg: any){
    return JSON.stringify(msg, null, 2);
  }

  toggleShow(idx: number){
    const res = !this.dataShowed[idx];
    this.dataShowed = this.dataShowed.map(() => false);
    this.dataShowed[idx] = res;
  }

  getTime(timestamp: number) {
    return this.channelService.timeConverter(timestamp);
  }
}
