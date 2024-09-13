import { applyDecorators, HttpStatus, Post } from '@nestjs/common';
import { AnyClass } from '@packages/shared';
import { Return } from './Returns';

type CreateParams = {
  inputDto: AnyClass;
  dto?: AnyClass;
  endpoint?: string;
  description?: string;
};

export function Create({ inputDto, description, dto, endpoint }: CreateParams) {
  return applyDecorators(
    Post(endpoint || '/'),
    Return({
      dto,
      inputDto,
      status: HttpStatus.CREATED,
      description: description,
    }),
  );
}
