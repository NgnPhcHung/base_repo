import { ConfigService } from '@nestjs/config';
import * as entities from './src/entities';

const config = new ConfigService();

const ormconfig = {
  type: 'postgres',
  host: config.get('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get('DB_USERNAME'),
  password: config.get('DB_PASSWORD'),
  database: config.get('DB_NAME'),
  entities: Object.values(entities),
  synchronize: config.get<boolean>('TYPEORM_SYNC'),
  logging: config.get<boolean>('TYPEORM_LOGGING'),

  //for seed
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export default ormconfig;
