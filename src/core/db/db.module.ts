import { createKeyv, Keyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [],
        synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
        logging: configService.get('DB_LOGGING') === 'true',
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const username = configService.get('MONGO_USERNAME');
        const password = configService.get('MONGO_PASSWORD');
        const host = configService.get('MONGO_HOST');
        const port = configService.get('MONGO_PORT');
        const database = configService.get('MONGO_DATABASE');
        const authSource = configService.get('MONGO_AUTH_SOURCE');
        const uri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}`;
        console.log('MongoDB connection URI:', uri);
        return {
          uri,
          retryAttempts: 5, // 重试次数
          retryDelay: 1000, // 重试间隔
          connectionFactory: (connection) => {
            connection.on('error', (error) => {
              console.error('MongoDB connection error:', error);
            });
          },
        };
      },
    }),
    // redis
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const url = `redis://${configService.get('REDIS_HOST')}:${configService.get('REDIS_PORT')}`;
        console.log('Redis connection URL:', url);
        return {
          stores: [createKeyv(url)],
        };
      },
    }),
  ],
})
export class DbModule {}
