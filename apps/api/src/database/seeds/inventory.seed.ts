import { ensurePromise } from '@packages/shared';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { CategoryEntity, InventoryEntity, UserEntity } from 'src/entities';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export class InventorySeeder implements Seeder {
  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const categoryRepository = dataSource.getRepository(CategoryEntity);
    const userRepository = dataSource.getRepository(UserEntity);
    const inventoryRepository = dataSource.getRepository(InventoryEntity);

    const categoryStream = createReadStream(
      'src/seed-data/CategoryData.csv',
    ).pipe(parse({ columns: true, delimiter: ',' }));

    const inventoryStream = createReadStream(
      'src/seed-data/InventoryData.csv',
    ).pipe(parse({ columns: true, delimiter: ',' }));

    for await (const row of categoryStream) {
      try {
        const category = new CategoryEntity();
        category.title = row.title;
        category.status = row.status;
        category.description = row.description;
        const existingCategory = await categoryRepository.findOneBy({
          title: category.title,
        });
        if (!existingCategory) {
          await categoryRepository.save(category);
        }
      } catch (error) {
        console.error('Error saving category:', error);
      }
    }

    for await (const row of inventoryStream) {
      try {
        const user = await ensurePromise(userRepository.findOneBy({ id: row.userId }), "User not found");
       
        const inventory = new InventoryEntity();
        inventory.title = row.title;
        inventory.description = row.description;
        inventory.price = row.price;
        inventory.quantity = row.quantity;
        inventory.status = row.status;
        inventory.category = row.categoryId;
        inventory.user = user;

        await inventoryRepository.save(inventory);
      } catch (error) {
        console.error('Error saving inventory:', error);
      }
    }
    console.log('All inventory have been processed.');
  }
}
