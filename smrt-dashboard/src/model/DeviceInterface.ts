import { AccountInterface } from "./AccountInterface";

export interface DeviceInterface {
  deviceId: number,
  name: string,
  number: string,
  model: string,
  account: AccountInterface,
  date : string
 };
