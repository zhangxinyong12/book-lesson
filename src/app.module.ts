import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './common/config/config.module';
import { LoggerModule } from './common/logger/logger.module';
import { DbModule } from './core/db/db.module';
import { UserModule } from './user/user.module';
import { LogsModule } from './logs/logs.module';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    LogsModule,
    DbModule,
    UserModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
