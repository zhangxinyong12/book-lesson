import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionFilter } from './common/filters/all-exception/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用winston日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  // 使用全局过滤器
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapterHost));

  // 读取配置文件
  const configService = app.get(ConfigService);
  // 根据配置文件设置跨域
  const isCors = configService.get('CORS_ON') === 'true';
  if (isCors) {
    app.enableCors();
  }
  // 监听端口
  await app.listen(configService.get('PORT') ?? 3000);
  console.log('PORT:' + configService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
