import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import appConfig from '~config/app.config';
import databaseConfig from '~config/database.config';
import { SeederModule } from '~seeder/seeder.module';
import { env } from '~config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          type: env.DATABASE.TYPE,
          host: env.DATABASE.HOST,
          port: env.DATABASE.PORT,
          username: env.DATABASE.USERNAME,
          password: env.DATABASE.PASSWORD,
          database: env.DATABASE.DB_NAME,
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: false,
          autoLoadEntities: false,
          cli: {
            migrationsDir: 'src/migration',
          },
          migrationsTableName: 'migrations_typeorm',
          migrationsRun: true,
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
