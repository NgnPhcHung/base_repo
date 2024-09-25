import { AutoMap } from '@automapper/classes';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Column, ColumnOptions } from 'typeorm';


interface IProperty extends ColumnOptions {
  ignore?: boolean;
}

/**
 * @property ignore use this property in case you don't wanna apply AutoMap
 */
export default function Property(property?: IProperty) {
    const decorators = [
        ApiProperty(property),
        Column(property)
    ];

    if (!property?.ignore) {
        decorators.push(AutoMap());
    }

    return applyDecorators(...decorators);
}
