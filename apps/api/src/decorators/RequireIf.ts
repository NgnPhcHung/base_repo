import { applyDecorators } from '@nestjs/common';
import { IsNotEmpty, ValidateIf } from 'class-validator';

export function RequireIf(condition: (object: any, value: any) => boolean) {
  return applyDecorators(ValidateIf(condition), IsNotEmpty);
}
