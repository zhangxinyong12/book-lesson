# Docker 使用指南 🐳

欢迎使用 Docker 来管理你的项目！这个文档将详细介绍如何使用 Docker 来运行和管理你的 book-lesson 项目。

## 📋 目录

- [快速开始](#快速开始)
- [常用命令](#常用命令)
- [容器管理](#容器管理)
- [数据管理](#数据管理)
- [网络管理](#网络管理)
- [故障排除](#故障排除)

## 🚀 快速开始

### 1. 启动所有服务

```bash
# 在后台启动所有容器
docker-compose up -d

# 查看启动状态
docker-compose ps
```

### 2. 访问服务

- **Adminer 数据库管理工具**: http://localhost:8080
- **MySQL 数据库**: localhost:3306
- **MongoDB 数据库**: localhost:27017
- **Redis 缓存**: localhost:6379

### 3. 停止服务

```bash
# 停止并删除容器
docker-compose down
```

## 🛠️ 常用命令

### 基础操作命令

```bash
# 启动服务（后台运行）
docker-compose up -d

# 启动服务（前台运行，可以看到日志）
docker-compose up

# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 重启服务
docker-compose restart

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 查看特定服务的日志
docker-compose logs mysql
docker-compose logs mongodb
docker-compose logs redis
docker-compose logs adminer
```

### 高级操作命令

```bash
# 停止并删除容器 + 删除数据卷（⚠️ 危险！会删除所有数据）
docker-compose down -v

# 停止并删除容器 + 删除镜像（⚠️ 危险！会删除镜像）
docker-compose down --rmi all

# 重新构建并启动服务
docker-compose up -d --build

# 强制重新创建容器
docker-compose up -d --force-recreate

# 只启动特定服务
docker-compose up -d mysql redis

# 进入容器内部（调试用）
docker-compose exec mysql bash
docker-compose exec mongodb mongosh
docker-compose exec redis redis-cli
```

## 🐳 容器管理

### 查看容器状态

```bash
# 查看所有容器状态
docker-compose ps

# 查看所有容器（包括停止的）
docker ps -a

# 查看容器资源使用情况
docker stats
```

### 进入容器内部

```bash
# 进入 MySQL 容器
docker-compose exec mysql bash

# 进入 MongoDB 容器
docker-compose exec mongodb mongosh

# 进入 Redis 容器
docker-compose exec redis redis-cli

# 进入 Adminer 容器
docker-compose exec adminer sh
```

### 容器操作

```bash
# 暂停容器
docker-compose pause

# 恢复容器
docker-compose unpause

# 重启特定服务
docker-compose restart mysql

# 查看容器日志
docker-compose logs -f mysql
```

## 💾 数据管理

### 数据卷位置

项目的数据存储在以下目录：

```
./docker/
├── mysql/data/          # MySQL 数据
├── mongodb/data/        # MongoDB 数据
└── redis/data/          # Redis 数据
```

### 数据备份

```bash
# 备份 MySQL 数据
docker-compose exec mysql mysqldump -u root -proot123456 book_lesson > backup.sql

# 备份 MongoDB 数据
docker-compose exec mongodb mongodump --out /backup

# 备份 Redis 数据
docker-compose exec redis redis-cli SAVE
```

### 数据恢复

```bash
# 恢复 MySQL 数据
docker-compose exec -T mysql mysql -u root -proot123456 book_lesson < backup.sql

# 恢复 MongoDB 数据
docker-compose exec mongodb mongorestore /backup
```

## 🌐 网络管理

### 查看网络

```bash
# 查看所有网络
docker network ls

# 查看项目网络详情
docker network inspect book-lesson_book-lesson-network
```

### 网络连接

```bash
# 查看容器网络配置
docker-compose exec mysql ip addr show

# 测试容器间连通性
docker-compose exec mysql ping mongodb
docker-compose exec mysql ping redis
```

## 🔧 故障排除

### 常见问题解决

#### 1. 端口被占用

```bash
# 查看端口占用情况
netstat -tulpn | grep :8080
netstat -tulpn | grep :3306
netstat -tulpn | grep :27017
netstat -tulpn | grep :6379

# 杀死占用端口的进程
kill -9 <进程ID>
```

#### 2. 容器启动失败

```bash
# 查看详细错误日志
docker-compose logs mysql

# 重新创建容器
docker-compose up -d --force-recreate mysql
```

#### 3. 数据丢失问题

```bash
# 检查数据卷挂载
docker volume ls

# 检查容器内数据
docker-compose exec mysql ls -la /var/lib/mysql
```

#### 4. 内存不足

```bash
# 查看容器资源使用
docker stats

# 限制容器内存使用（在 docker-compose.yml 中添加）
# deploy:
#   resources:
#     limits:
#       memory: 512M
```

### 日志查看技巧

```bash
# 实时查看日志
docker-compose logs -f

# 查看最近100行日志
docker-compose logs --tail=100

# 查看特定时间段的日志
docker-compose logs --since="2024-01-01T00:00:00" --until="2024-01-01T23:59:59"
```

## 📚 学习资源

### Docker 官方文档

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)

### 常用 Docker 镜像

- [MySQL 官方镜像](https://hub.docker.com/_/mysql)
- [MongoDB 官方镜像](https://hub.docker.com/_/mongo)
- [Redis 官方镜像](https://hub.docker.com/_/redis)
- [Adminer 官方镜像](https://hub.docker.com/_/adminer)

## 🎯 最佳实践

### 1. 开发环境

- 使用 `docker-compose up -d` 启动服务
- 使用 `docker-compose logs -f` 查看日志
- 使用 `docker-compose down` 停止服务

### 2. 生产环境

- 设置资源限制
- 配置日志轮转
- 定期备份数据
- 监控容器状态

### 3. 调试技巧

- 使用 `docker-compose exec` 进入容器
- 使用 `docker-compose logs` 查看日志
- 使用 `docker stats` 监控资源

---

## 💡 小贴士

1. **首次启动**：第一次启动可能需要下载镜像，请耐心等待
2. **数据安全**：重要数据请定期备份
3. **端口冲突**：如果端口被占用，可以修改 docker-compose.yml 中的端口映射
4. **资源监控**：使用 `docker stats` 监控容器资源使用情况

现在你已经掌握了 Docker 的基本用法！如果遇到问题，可以查看这个文档或者问我哦！🚀
