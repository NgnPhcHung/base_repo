import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as entities from '../src/entities';
import * as dotenv from 'dotenv';
dotenv.config();

const config = new ConfigService();

const dataSource = new DataSource({
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: config.get('DB_NAME'),
  entities: Object.values(entities),
});

async function clearDatabaseData() {
  try {
    await dataSource.initialize();
    const entities = dataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name);
      await repository.query(
        `TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`,
      );
    }

    console.log('All tables have been cleared.');
  } catch (error) {
    console.error('Error clearing database data:', error);
  } finally {
    await dataSource.destroy();
  }
}

clearDatabaseData();
