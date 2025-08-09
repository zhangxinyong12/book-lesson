import { utilities } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

// 控制台日志格式器（带颜色）
export const consoleTransports = new winston.transports.Console({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), // 时间戳
    winston.format.ms(), // 毫秒
    utilities.format.nestLike('BookLesson'), // 日志格式  nestLike格式（带颜色）
  ),
});

// 文件日志格式器（不带颜色）
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // 时间戳格式
  winston.format.ms(), // 毫秒
  winston.format.printf(({ timestamp, level, message, context, ms }) => {
    // 自定义文件日志格式，不包含颜色代码
    return `[${timestamp}] ${level.toUpperCase()} [${context}] ${message} ${ms}`;
  }),
);

export const createDailyRotateTransport = (level: string, filename: string) => {
  return new DailyRotateFile({
    level: level,
    filename: `${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true, // 是否压缩
    maxSize: '20m', // 最大文件大小
    maxFiles: '14d', // 最大文件数量
    format: fileFormat, // 使用不带颜色的文件格式
  });
};
