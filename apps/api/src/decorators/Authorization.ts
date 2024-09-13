import { JwtAuthGuard } from '@guards';
import { applyDecorators, CanActivate, UseGuards } from '@nestjs/common';

type Guard = CanActivate | Function;

export function Authorization(...args: Guard[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, ...args),
  );
}
