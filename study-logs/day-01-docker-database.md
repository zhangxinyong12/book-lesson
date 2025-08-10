# 🐳 Day 01 - Docker基础学习 + 数据库连接创建表

## 📅 学习日期

**2024年12月19日** - 学习第一天

## 🎯 今日学习目标

1. 学习Docker基础知识
2. 使用Docker启动数据库服务
3. 连接数据库并创建表结构

## 🐳 Docker基础学习

### 1. Docker是什么？

Docker是一个开源的容器化平台，它可以将应用程序和其依赖项打包到一个称为容器的标准化单元中。

**简单理解**：就像把整个应用打包成一个"盒子"，这个盒子可以在任何地方运行，不会因为环境不同而出问题。

### 2. 今天学到的Docker概念

#### 容器 (Container)

- 轻量级的、可执行的软件包
- 包含运行应用程序所需的所有内容
- 可以快速启动、停止、删除

#### 镜像 (Image)

- 容器的模板
- 包含运行应用程序所需的所有文件和配置
- 可以重复使用来创建多个容器

#### Docker Compose

- 用于定义和运行多容器Docker应用程序的工具
- 通过YAML文件配置应用程序的服务

### 3. 项目中的Docker服务

#### MySQL数据库服务

```yaml
mysql:
  image: mysql:8.0
  ports:
    - '3306:3306' # 主机端口:容器端口
  environment:
    MYSQL_ROOT_PASSWORD: root123456
    MYSQL_DATABASE: book_lesson
    MYSQL_USER: book_user
    MYSQL_PASSWORD: user123456
```

#### MongoDB数据库服务

```yaml
mongodb:
  image: mongo:7.0
  ports:
    - '27017:27017'
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: admin123456
    MONGO_INITDB_DATABASE: book_lesson
```

#### Redis缓存服务

```yaml
redis:
  image: redis:7.2-alpine
  ports:
    - '6379:6379'
```

#### Adminer数据库管理工具

```yaml
adminer:
  image: adminer:4.8.1
  ports:
    - '8080:8080'
```

## 🗄️ 数据库连接与表创建

### 1. 启动数据库服务

```bash
# 启动所有服务（后台运行）
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs
```

### 2. 访问数据库管理工具

- **Adminer地址**: http://localhost:8080
- **默认数据库类型**: MySQL
- **默认数据库**: book_lesson

### 3. 数据库连接信息

#### MySQL连接

- **系统**: MySQL
- **服务器**: mysql
- **用户名**: book_user 或 root
- **密码**: user123456 或 root123456
- **数据库**: book_lesson
- **端口**: 3306

#### MongoDB连接

- **系统**: MongoDB
- **服务器**: mongodb
- **用户名**: admin
- **密码**: admin123456
- **数据库**: book_lesson
- **端口**: 27017

#### Redis连接

- **系统**: Redis
- **服务器**: redis
- **端口**: 6379
- **密码**: 无

### 4. 创建数据库表

#### 示例：创建用户表

```sql
-- 创建用户表
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_username ON users(username);
CREATE INDEX idx_email ON users(email);
```

#### 示例：创建课程表

```sql
-- 创建课程表
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    instructor_id INT,
    price DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);
```

## 🛠️ 常用Docker命令

### 基础操作

```bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose stop

# 停止并删除容器
docker-compose down

# 重启服务
docker-compose restart

# 查看服务状态
docker-compose ps
```

### 日志查看

```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs mysql
docker-compose logs mongodb
docker-compose logs redis
```

### 容器管理

```bash
# 进入容器内部
docker-compose exec mysql bash
docker-compose exec mongodb mongosh
docker-compose exec redis redis-cli

# 强制重新创建容器
docker-compose up -d --force-recreate
```

## 📚 今日学习收获

### 1. 技术收获

- ✅ 理解了Docker的基本概念（容器、镜像、Docker Compose）
- ✅ 学会了使用docker-compose启动多服务环境
- ✅ 掌握了数据库连接的基本配置
- ✅ 学会了创建基本的数据库表结构

### 2. 实践收获

- ✅ 成功启动了完整的开发环境
- ✅ 配置了MySQL、MongoDB、Redis三种数据库
- ✅ 集成了Adminer数据库管理工具
- ✅ 学会了查看容器状态和日志

### 3. 遇到的问题

- 无（环境配置顺利）

## 🎯 明日学习计划

### 1. 数据库操作进阶

- 学习SQL基础语法
- 练习增删改查操作
- 学习数据库设计原则

### 2. NestJS框架学习

- 了解NestJS项目结构
- 学习创建控制器和服务
- 实现数据库连接和操作

### 3. 项目实战

- 设计用户管理系统
- 实现基础的CRUD操作
- 学习API接口设计

## 💡 学习心得

今天是学习编程的第一天，通过Docker的学习，我深刻理解了"容器化"的概念。Docker就像一个神奇的魔法盒，可以把复杂的应用环境打包成简单的容器，让开发变得轻松愉快！

数据库的学习也很有趣，通过Adminer工具，我可以直观地看到数据库的结构，创建表的过程让我对数据存储有了更深的理解。

明天要继续加油，深入学习NestJS框架，争取早日实现自己的第一个完整项目！🚀

## 📝 学习笔记

### Docker核心概念

- **容器**: 运行中的应用程序实例
- **镜像**: 容器的模板和蓝图
- **Docker Compose**: 多容器应用编排工具
- **数据卷**: 容器数据的持久化存储

### 数据库基础

- **MySQL**: 关系型数据库，适合结构化数据
- **MongoDB**: 文档型数据库，适合灵活的数据结构
- **Redis**: 内存数据库，适合缓存和快速访问
- **Adminer**: 轻量级数据库管理工具

---

**学习进度**: Day 01/100 ✅  
**心情**: 😊 充满期待  
**明日目标**: 深入学习NestJS框架
