import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { LogsModule } from './common/logger/logs.module';
import { DbModule } from './core/db/db.module';

@Module({
  imports: [ConfigModule, LogsModule, DbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
