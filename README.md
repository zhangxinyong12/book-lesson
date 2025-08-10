# 天下大势，分久必合，合久必分

随着AI时代的来临，以后必将是全栈工程师的天下。  
对于前端来说，学习掌握nestjs，是必须的。

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g mau
$ mau deploy
```

## 启动docker

详细的 Docker 使用说明请查看 [Docker 使用指南](docker-readme.md)

```bash
docker-compose up -d
```

## 停止docker

```bash
docker-compose down
```

## 数据库管理工具 Adminer

项目集成了 Adminer 数据库管理工具，支持管理 MySQL、MongoDB 和 Redis。

### 访问 Adminer

启动容器后，在浏览器中访问：`http://localhost:8080`

### 连接数据库

#### MySQL 连接信息

- **系统**: MySQL
- **服务器**: mysql
- **用户名**: book_user 或 root
- **密码**: user123456 或 root123456
- **数据库**: book_lesson

#### MongoDB 连接信息

- **系统**: MongoDB
- **服务器**: mongodb
- **用户名**: admin
- **密码**: admin123456
- **数据库**: book_lesson

#### Redis 连接信息

- **系统**: Redis
- **服务器**: redis
- **端口**: 6379
- **密码**: 无（默认配置）
