import { Get, HttpStatus, applyDecorators } from '@nestjs/common';
import { Return } from './Returns';
import { AnyClass } from '@packages/shared';

type ReadParams = {
  inputDto?: AnyClass | [AnyClass];
  dto?: AnyClass;
  description?: string;
};

export function Read(
  endpoint: string,
  { inputDto, description, dto }: ReadParams,
) {
  return applyDecorators(
    Get(endpoint),
    Return({
      inputDto,
      status: HttpStatus.OK,
      description: description,
    }),
  );
}
