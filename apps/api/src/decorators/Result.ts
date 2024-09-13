import { ManyResult, PaginationResult, SingleResult } from '@packages/models';

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
    paging?: { offset: number; limit: number },
  ): PaginationResult<T>;
  static multiple<T>(data: T[]): ManyResult<T>;
  static multiple<T>(
    data: T[],
    total?: number,
    paging?: { offset: number; limit: number },
  ) {
    if (total && paging) {
      return new PaginationResult(data, total, paging.offset, paging.limit);
    } else {
      return new ManyResult(data, data.length);
    }
  }
}
