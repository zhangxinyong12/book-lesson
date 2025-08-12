import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
import {
  consoleTransports,
  createDailyRotateTransport,
} from './createDailyRotateTransport';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log('isProduction:', configService.get('LOG_ON'));
        const logOn = configService.get('LOG_ON') === 'true';

        return {
          transports: [
            consoleTransports,
            ...(logOn
              ? [
                  createDailyRotateTransport('info', 'logs/info'),
                  createDailyRotateTransport('error', 'logs/error'),
                  createDailyRotateTransport('warn', 'logs/warn'),
                ]
              : []),
          ],
        };
      },
    }),
  ],
  exports: [WinstonModule],
})
export class LoggerModule {}
