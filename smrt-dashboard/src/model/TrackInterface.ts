import { StationInterface } from "./StationInterface";

export interface TrackInterface {
  trackId: number,
  name: string,
  startStation: StationInterface,
  endStation: StationInterface,
  date : string
};
