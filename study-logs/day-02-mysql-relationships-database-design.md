# 📚 Day 02 - MySQL关系类型与数据库设计

## 📅 学习日期

**2024年12月19日** - 学习第2天

## 🎯 今日学习目标

1. 理解MySQL中的一对一、一对多、多对多关系
2. 掌握数据库设计的常用原则和范式
3. 学会设计合理的数据库表结构

## 📖 理论学习

### 1. MySQL关系类型详解

#### 一对一关系 (One-to-One)

- **概念**: 一个表中的一条记录对应另一个表中的一条记录
- **应用场景**: 用户基本信息表 + 用户详细信息表
- **设计原则**: 通常用于垂直分表，减少单表字段数量

#### 一对多关系 (One-to-Many)

- **概念**: 一个表中的一条记录对应另一个表中的多条记录
- **应用场景**: 用户 + 订单、部门 + 员工
- **设计原则**: 在"多"的一方添加外键引用"一"的一方

#### 多对多关系 (Many-to-Many)

- **概念**: 一个表中的多条记录对应另一个表中的多条记录
- **应用场景**: 用户 + 角色、学生 + 课程
- **设计原则**: 需要中间表来存储两个表之间的关联关系

### 2. 数据库设计常用原则

#### 三大范式

1. **第一范式 (1NF)**: 每个字段都是原子性的，不可再分
2. **第二范式 (2NF)**: 在1NF基础上，非主键字段完全依赖于主键
3. **第三范式 (3NF)**: 在2NF基础上，非主键字段不能传递依赖于主键

## 🛠️ 实践操作

### 1. 创建一对一关系表

```sql
-- 用户基本信息表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

-- 用户详细信息表（一对一关系）
CREATE TABLE user_profiles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT UNIQUE NOT NULL,  -- UNIQUE确保一对一关系
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 2. 创建一对多关系表

```sql
-- 部门表
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- 员工表（一对多关系）
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,  -- 外键引用部门表
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

### 3. 创建多对多关系表

```sql
-- 学生表
CREATE TABLE students (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- 课程表
CREATE TABLE courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- 学生课程关联表（多对多关系）
CREATE TABLE student_courses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id),
    UNIQUE KEY unique_student_course (student_id, course_id)
);
```

## 💻 代码示例

### 查询一对多关系数据

```sql
-- 查询部门及其所有员工
SELECT
    d.name as department_name,
    e.name as employee_name
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
ORDER BY d.name, e.name;
```

### 查询多对多关系数据

```sql
-- 查询学生选课信息
SELECT
    s.name as student_name,
    c.name as course_name
FROM students s
JOIN student_courses sc ON s.id = sc.student_id
JOIN courses c ON sc.course_id = c.id
ORDER BY s.name, c.name;
```

## 📚 今日学习收获

### 1. 技术收获

- ✅ 理解了MySQL中三种关系类型的特点和应用场景
- ✅ 掌握了数据库设计的三大范式
- ✅ 学会了创建外键约束和设计合理的表结构

### 2. 实践收获

- ✅ 能够设计一对一、一对多、多对多的表结构
- ✅ 学会了使用外键约束保证数据完整性
- ✅ 掌握了多表关联查询的SQL语法

## 🎯 明日学习计划

1. 学习TypeORM的实体定义和装饰器
2. 实践TypeORM的关系配置
3. 掌握TypeORM的查询API

## 💡 学习心得

今天深入学习了MySQL的关系类型和数据库设计原则，对数据库的理解更加系统化了。理解了为什么需要中间表来处理多对多关系，以及外键约束在保证数据完整性方面的重要作用。

---

**学习进度**: Day 02/100 ✅  
**心情**: 😊 对数据库设计有了更深入的理解  
**明日目标**: 学习TypeORM的使用和关系配置
