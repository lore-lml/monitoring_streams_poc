export class WasteCollectionMsg {
  licensePlate: string;
  operatorId: string;
  maxWeight: number;
  timestamp: number;
  lastUpdate: WasteInfo;

  constructor(licensePlate: string, operatorId: string, maxWeight: number,
              timestamp: number, latitude: number, longitude: number, weight: number) {
    this.licensePlate = licensePlate;
    this.operatorId = operatorId;
    this.maxWeight = maxWeight;
    this.timestamp = timestamp;
    this.lastUpdate = new WasteInfo(latitude, longitude, weight);
  }
}

class WasteInfo{
  latitude: number;
  longitude: number;
  weight: number;

  constructor(latitude: number, longitude: number, weight: number) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.weight = weight;
  }
}
