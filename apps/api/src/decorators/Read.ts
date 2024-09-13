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
  const isSingle = !Array.isArray(inputDto);
  const name: string = isSingle ? dto.name : dto[0].name;

  return applyDecorators(
    Get(endpoint),
    Return({
      inputDto,
      status: HttpStatus.OK,
      description:
        description ??
        `Get ${(isSingle ? name : name + 's').toLowerCase()} successfully`,
    }),
  );
}
