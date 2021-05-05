import {MsgInfo} from '../channel-reader-wrap.model';

export class ScaleMsg {
  plant: string;
  timestamp: number;
  truckInfo: TruckInfo;

  constructor(plant: string, timestamp: number, licensePlate: string,
              operatorId: string, weight: number,
              channelId: string, announceId: string, msgId: string) {
    this.plant = plant;
    this.timestamp = timestamp;
    const info = new MsgInfo(channelId, announceId, msgId);
    this.truckInfo = new TruckInfo(licensePlate, operatorId, weight, info);
  }
}

class TruckInfo{
  licensePlate: string;
  operatorId: string;
  weight: number;
  msgInfo: MsgInfo;

  constructor(licensePlate: string, operatorId: string, weight: number, msgInfo: MsgInfo) {
    this.licensePlate = licensePlate;
    this.operatorId = operatorId;
    this.weight = weight;
    this.msgInfo = msgInfo;
  }
}
