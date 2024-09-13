import { InventoryStatus } from '@packages/models';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { InventoryEntity } from 'src/entities';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class InventorySeeder implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const inventoryRepository = dataSource.getRepository(InventoryEntity);

    const stream = createReadStream('src/seed-data/inventoryData.csv').pipe(
      parse({ columns: true, delimiter: ',' }),
    );
    console.log('Seeding Inventory');

    for await (const row of stream) {
      try {
        const inventory = new InventoryEntity();
        inventory.title = row.title;
        inventory.partNo = row.partNo;
        inventory.description = row.description;
        inventory.price = parseFloat(row.price);
        inventory.quantity = parseInt(row.quantity, 10);
        inventory.status = row.status as InventoryStatus;
        await inventoryRepository.save(inventory);
      } catch (error) {
        console.error('Error saving Inventory:', error);
      }
    }
  }
}
