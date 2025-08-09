import { utilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const consoleTransports = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), // 时间戳
    winston.format.colorize(), // 日志颜色
    winston.format.ms(), // 毫秒
    utilities.format.nestLike('BookLesson'), // 日志格式  nestLike格式
    // winston.format.json(), // 日志格式  json格式
  ),
});

export const createDailyRotateTransport = (level: string, filename: string) => {
  return new DailyRotateFile({
    level: level,
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // 是否压缩
    maxSize: '20m', // 最大文件大小
    maxFiles: '14d', // 最大文件数量
    format: winston.format.combine(
      winston.format.timestamp(), // 时间戳
      winston.format.json(), // 日志格式
      winston.format.ms(), // 毫秒
      utilities.format.nestLike('BookLesson'), // 日志格式  nestLike格式
    ),
  });
};
