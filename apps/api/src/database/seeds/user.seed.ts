import { classes } from '@automapper/classes';
import { createMap, createMapper, Mapper } from '@automapper/core';
import { UserCreationBody } from '@packages/models';
import { parse } from 'csv-parse';
import { createReadStream } from 'fs';
import { UserEntity } from 'src/entities';
import { DataSource } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import * as bcrypt from 'bcrypt';

export class UserSeeder implements Seeder {
  private mapper: Mapper;

  constructor() {
    this.mapper = createMapper({
      strategyInitializer: classes(),
    });

    createMap(this.mapper, UserCreationBody, UserEntity);
  }

  public async run(factory: Factory, dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);

    const stream = createReadStream('src/seed-data/userData.csv').pipe(
      parse({ columns: true, delimiter: ',' }),
    );

    console.log('Seeding Users');
    for await (const row of stream) {
      try {
        const user = this.mapper.map(row, UserCreationBody, UserEntity);
        const passwordHashed = await bcrypt.hash(user.password, 10);
        user.password = passwordHashed;
        await userRepository.save(user);
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
    console.log('All users have been processed.');
  }
}
