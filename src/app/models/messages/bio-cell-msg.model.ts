import {MsgInfo} from '../channel-reader-wrap.model';

export class BioCellMsg {
  plant: string;
  digestorId: string;
  timestamp: number;
  measure: BioCellMeasure;
  scaleInfo: ScaleInfo;

  constructor(plant: string, digestorId: string, timestamp: number,
              temperature: number, humidity: number,
              weight: number, msgInfo: MsgInfo) {
    this.plant = plant;
    this.digestorId = digestorId;
    this.timestamp = timestamp;
    this.measure = new BioCellMeasure(temperature, humidity);
    this.scaleInfo = new ScaleInfo(weight, msgInfo);
  }
}

class BioCellMeasure{
  temperature: number;
  humidity: number;

  constructor(temperature: number, humidity: number) {
    this.temperature = temperature;
    this.humidity = humidity;
  }
}

class ScaleInfo{
  weight: number;
  msgInfo: MsgInfo;

  constructor(weight: number, msgInfo: MsgInfo) {
    this.weight = weight;
    this.msgInfo = msgInfo;
  }
}
