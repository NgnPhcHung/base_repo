import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InventoryEntity } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryEntity)
    private inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async findOne(id: number): Promise<InventoryEntity | undefined> {
    return this.inventoryRepository.findOne({ where: { id } });
  }
}
