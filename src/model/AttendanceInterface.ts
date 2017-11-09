import { StationInterface } from "./StationInterface";

export interface AttendanceInterface {
  attendanceId: number,
  checkInDate: string,
  checkInStation: StationInterface,
  checkOutDate: string,
  checkOutStation: StationInterface,
  date: string
};
