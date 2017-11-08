import { StationInterface } from "./StationInterface";
import { NodeInterface } from "./NodeInterface";
import { SectionInterface } from "./SectionInterface";

export interface TrackingInterface {
  trackingId: number,
  primaryNode: NodeInterface,
  secondaryNode: NodeInterface,
  primaryDistance: number,
  secondaryDistance: number,
  section: SectionInterface,
  stations: Array<StationInterface>,
  type: string,
  date : string
 };
