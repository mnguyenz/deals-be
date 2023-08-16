const { DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } =
  process.env;

module.exports = {
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  migrations: [__dirname + '/src/migration/*{.ts,.js}'],
  entities: [__dirname + '/src/**/**/*.entity{.ts,.js}'],
  seeds: [__dirname + '/src/seeder/data/*{.ts,.js}'],
  keepConnectionAlive: true,
  synchronize: false,
};
