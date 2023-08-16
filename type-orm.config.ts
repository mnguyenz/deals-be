import { DataSource } from 'typeorm';
import { env } from './src/config/env.config';

export default new DataSource({
  type: env.DATABASE.TYPE,
  host: env.DATABASE.HOST,
  port: env.DATABASE.PORT,
  username: env.DATABASE.USERNAME,
  password: env.DATABASE.PASSWORD,
  database: env.DATABASE.DB_NAME,
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  entities: [__dirname + '/src/entities/*.entity{.ts,.js}'],
});
