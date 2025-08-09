import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: T, host: ArgumentsHost) {
    this.logger.error(exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    const responseBody = {
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params,
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
      exception: exception['name'],
      ip: requestIp.getClientIp(request),
    };
    httpAdapter.reply(response, responseBody, statusCode);
  }
}
