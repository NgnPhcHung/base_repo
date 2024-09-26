import {
  ManyResult,
  Pageable,
  PaginationResult,
  SingleResult,
} from '@packages/models';

export class Result {
  static single<T>(data: T): SingleResult<T> {
    return new SingleResult(data);
  }

  static empty(): void {
    return undefined;
  }

  static multiple<T>(
    data: T[],
    total: number,
    paging?: Pageable,
  ): PaginationResult<T>;
  static multiple<T>(data: T[]): ManyResult<T>;
  static multiple<T>(data: T[], total?: number, paging?: Pageable) {
    if (total && paging) {
      return new PaginationResult(data, total, paging);
    } else {
      return new ManyResult(data, data.length);
    }
  }
}
