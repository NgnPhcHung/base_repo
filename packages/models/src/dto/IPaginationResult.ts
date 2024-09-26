import { IManyResult } from "./IManyResult";

export interface IPaginationResult<Resource> extends IManyResult<Resource> {
  data: Resource[];
}
