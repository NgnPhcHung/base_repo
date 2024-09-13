import {
  HttpCode,
  HttpStatus,
  Delete as NestDelete,
  applyDecorators,
} from '@nestjs/common';
import { AnyClass } from '@packages/shared';
import { Return } from './Returns';

type DeleteParams = {
  inputDto: AnyClass;
  dto?: AnyClass;
  description?: string;
};

export function Delete(
  endpoint: string,
  { inputDto, description, dto }: DeleteParams,
) {
  return applyDecorators(
    NestDelete(endpoint),
    HttpCode(HttpStatus.NO_CONTENT),
    Return({
      dto,
      status: HttpStatus.NO_CONTENT,
      description:
        description ?? `Delete ${dto.name.toLowerCase()} successfully`,
    }),
  );
}
