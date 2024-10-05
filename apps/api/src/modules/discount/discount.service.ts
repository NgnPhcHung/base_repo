import { BaseOrmService } from '@common';
import { DiscountEntity } from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DiscountApplyType, DiscountType } from '@packages/models';
import {
  Between,
  EntityManager,
  In,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';

@Injectable()
export class DiscountService extends BaseOrmService<DiscountEntity> {
  constructor(
    @InjectRepository(DiscountEntity)
    private repo: Repository<DiscountEntity>,
    em: EntityManager,
  ) {
    super(DiscountEntity, em);
    this.repository = repo;
  }

  async isDiscountAvailable(discount: DiscountEntity) {
    const isUseable = await this.findOne({
      where: {
        id: discount.id,
        maxUses: MoreThan(discount.usesCount),
        isActive: true,
        startDate: MoreThan(new Date()),
        endDate: LessThan(new Date()),
      },
    });

    return !!isUseable;
  }
  async isAvailableForUser(discount: DiscountEntity, userId: number) {
    const isUseable = await this.findOne({
      where: {
        id: discount.id,
        usersUsed: {
          id: userId,
        },
      },
      relations: ['usersUsed'],
    });
    return !!isUseable;
  }

  async calculateDiscountValue(discount: DiscountEntity, value: number) {
    if (discount.discountType === DiscountType.Percentage) {
      return value * (discount.discountValue / 100);
    } 

    return value - discount.discountValue
  }
}
