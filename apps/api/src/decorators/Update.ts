import { applyDecorators, HttpStatus, Put } from '@nestjs/common';
import { AnyClass } from '@packages/shared';
import { Return } from './Returns';

type UpdateOptions = {
  inputDto: AnyClass;
  dto?: AnyClass;
  description?: string;
};

export function Update(
  endpoint: string,
  { inputDto, description, dto }: UpdateOptions,
) {
  const name = Array.isArray(inputDto)
    ? dto[0].name.toLowerCase()
    : dto.name.toLowerCase();

  return applyDecorators(
    Put(endpoint),
    Return({
      dto,
      inputDto,
      status: HttpStatus.OK,
      description:
        description ??
        `Update ${Array.isArray(inputDto) ? name + 's' : name} successfully`,
    }),
  );
}
