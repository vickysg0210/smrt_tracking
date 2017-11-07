import { NodeInterface } from "./NodeInterface";

export interface SectionInterface {
  sectionId: number,
  name: string,
  startNode: NodeInterface,
  endNode: NodeInterface,
  remark: string,
  date : string
 };
