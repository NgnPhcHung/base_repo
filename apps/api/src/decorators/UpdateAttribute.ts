import { applyDecorators, HttpStatus, Put } from '@nestjs/common';
import { AnyClass } from '@packages/shared';
import { Return } from './Returns';

type Entity<T> = new () => T;

type UpdateAttributeOptions<T> = {
  inputDto: Entity<T>;
  description?: string;
  dto?: AnyClass;
};

/**
 * Upgrade method PUT 
 * 
 * @param endpoint 
 * @param param1 
 * @returns 
 */
export function UpdateAttribute<T>(
  endpoint: string,
  { inputDto, description, dto }: UpdateAttributeOptions<T>,
) {
  const name: string = dto.name.toLowerCase();

  return applyDecorators(
    Put(endpoint),
    Return({
      dto,
      inputDto,
      status: HttpStatus.OK,
      description: description ?? `${name} updated successfully`,
    }),
  );
}
