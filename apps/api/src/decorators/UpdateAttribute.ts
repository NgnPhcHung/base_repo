import { applyDecorators, HttpStatus, Put } from '@nestjs/common';
import { AnyClass } from '@packages/shared';
import { Return } from './Returns';

type Entity<T> = new () => T;

type UpdateAttributeOptions<T> = {
  resource: Entity<T>;
  description?: string;
  dto?: AnyClass;
};

export function UpdateAttribute<T>(
  endpoint: string,
  { resource, description, dto }: UpdateAttributeOptions<T>,
) {
  const name: string = resource.name.toLowerCase();

  return applyDecorators(
    Put(endpoint),
    Return({
      dto,
      inputDto: resource,
      status: HttpStatus.OK,
      description: description ?? `${name} updated successfully`,
    }),
  );
}
