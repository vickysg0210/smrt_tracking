import { AttendanceInterface } from "./AttendanceInterface";
import { TrackingInterface } from "./TrackingInterface";

export interface AccountInterface {
  accountID : number,
  username : string,
  avatar: {
    url: string
  },
  type: string,
  active: boolean,
  attendance: AttendanceInterface,
  tracking: TrackingInterface,
  date : string
};
