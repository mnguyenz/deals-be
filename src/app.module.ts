import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import databaseConfig from '~config/database.config';
import { SeederModule } from '~seeder/seeder.module';
import { env } from '~config/env.config';
import { ProvinceModule } from '~provinces/province.module';
import { DistrictModule } from '~districts/district.module';
import { BrandModule } from '~brands/brand.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
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
    ProvinceModule,
    DistrictModule,
    BrandModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
