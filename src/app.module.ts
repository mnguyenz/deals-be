import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import appConfig from '~config/app.config';
import databaseConfig from '~config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get('database.type'),
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          entities: [__dirname + './../**/**.entity{.ts,.js}'],
          synchronize: configService.get('database.synchronize'),
          autoLoadEntities: configService.get('database.autoLoadEntities'),
          cli: {
            migrationsDir: 'src/migration',
          },
          migrationsTableName: 'migrations_typeorm',
          migrationsRun: true,
          keepConnectionAlive: true,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
