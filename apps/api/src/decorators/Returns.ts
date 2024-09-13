import { applyDecorators, HttpStatus, SetMetadata } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  ReferenceObject,
  SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ManyResult, PaginationResult, SingleResult } from '@packages/models';
import { AnyClass } from '@packages/shared';

type ReturnParams<T, D> = {
  status: HttpStatus;
  dto?: T;
  inputDto?: D;
  description?: string;
};

export function Return<
  D extends AnyClass | [AnyClass] | PaginationResult<AnyClass> | undefined,
  T extends AnyClass | undefined,
>({ dto, inputDto, status, description }: ReturnParams<T, D>): MethodDecorator {
  const apiBody: MethodDecorator[] = [];
  if (inputDto) apiBody.push(ApiBody({ type: () => inputDto }));

  if (!dto) {
    return function (
      target: any,
      propertyKey: string | symbol,
      descriptor: PropertyDescriptor,
    ) {
      applyDecorators(
        SetMetadata('statusCode', status),
        ApiResponse({
          status: status,
          description: description,
        }),
        ...apiBody,
      )(target, propertyKey, descriptor);
    };
  }

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const isArrayData = Array.isArray(dto);
    let result: [AnyClass, AnyClass] = [SingleResult, dto as AnyClass];

    if (isArrayData) {
      result = [ManyResult as AnyClass, dto[0]];
    }

    const [wrapper, model] = result;

    let properties: Record<string, SchemaObject | ReferenceObject> = {
      data: { $ref: getSchemaPath(model) },
    };

    if (isArrayData) {
      properties = {
        data: { items: { $ref: getSchemaPath(model) } },
      };
    }

    applyDecorators(
      SetMetadata('statusCode', status),
      ApiExtraModels(wrapper, model),
      ApiResponse({
        status: status,
        description: description,
        schema: {
          allOf: [
            { title: wrapper.name, $ref: getSchemaPath(wrapper) },
            {
              properties,
            },
          ],
        },
      }),
      ...apiBody,
    )(target, propertyKey, descriptor);
  };
}
