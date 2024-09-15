import { IManyResult } from "./IManyResult";

export interface IPaginationResult<Resource> extends IManyResult<Resource> {
  page: number;
  limit: number;
}
