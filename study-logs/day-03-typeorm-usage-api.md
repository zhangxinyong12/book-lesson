# 📚 Day 03 - TypeORM使用与API详解

## 📅 学习日期

**2024年12月19日** - 学习第3天

## 🎯 今日学习目标

1. 掌握TypeORM的实体定义和装饰器使用
2. 理解TypeORM的关系映射机制
3. 学会使用TypeORM的常用API进行数据操作

## 📖 理论学习

### 1. TypeORM基础概念

#### 什么是TypeORM

- **定义**: TypeORM是一个基于TypeScript的ORM框架，支持多种数据库
- **特点**: 支持装饰器、关系映射、迁移、查询构建器等
- **优势**: 类型安全、代码简洁、功能强大

#### 核心概念

- **Entity**: 实体类，对应数据库表
- **Repository**: 仓库模式，提供数据操作方法
- **QueryBuilder**: 查询构建器，构建复杂查询

### 2. TypeORM关系映射

#### 一对一关系 (@OneToOne)

- **概念**: 一个实体对应另一个实体的一个实例
- **应用场景**: 用户基本信息 + 用户详细信息

#### 一对多关系 (@OneToMany / @ManyToOne)

- **概念**: 一个实体对应另一个实体的多个实例
- **应用场景**: 部门 + 员工、用户 + 订单

#### 多对多关系 (@ManyToMany)

- **概念**: 一个实体对应另一个实体的多个实例，反之亦然
- **应用场景**: 用户 + 角色、学生 + 课程

## 🛠️ 实践操作

### 1. 创建一对一关系实体

```typescript
// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  @JoinColumn()
  profile: UserProfile;
}

// user-profile.entity.ts
@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
```

### 2. 创建一对多关系实体

```typescript
// department.entity.ts
@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}

// employee.entity.ts
@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn()
  department: Department;
}
```

### 3. 创建多对多关系实体

```typescript
// student.entity.ts
@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Course, (course) => course.students)
  @JoinTable({
    name: 'student_courses',
    joinColumn: { name: 'student_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
  })
  courses: Course[];
}
```

## 💻 代码示例

### Repository基本操作

```typescript
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 创建用户
  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  // 查找所有用户
  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['profile'], // 加载关联数据
    });
  }

  // 根据ID查找用户
  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }
}
```

### QueryBuilder复杂查询

```typescript
// 使用QueryBuilder构建复杂查询
async findUsersWithDepartment(): Promise<any[]> {
    return await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.profile', 'profile')
        .leftJoinAndSelect('user.department', 'department')
        .where('user.active = :active', { active: true })
        .orderBy('user.createdAt', 'DESC')
        .getMany();
}
```

## 📚 今日学习收获

### 1. 技术收获

- ✅ 掌握了TypeORM的实体定义和装饰器使用
- ✅ 理解了TypeORM的关系映射机制
- ✅ 学会了使用Repository进行基本CRUD操作
- ✅ 掌握了QueryBuilder构建复杂查询的方法

### 2. 实践收获

- ✅ 能够配置一对一、一对多、多对多关系
- ✅ 学会了使用relations加载关联数据
- ✅ 掌握了级联操作和懒加载的配置

## 🎯 明日学习计划

1. 学习TypeORM的迁移和种子数据
2. 实践TypeORM的性能优化技巧
3. 掌握TypeORM的事务处理

## 💡 学习心得

今天学习了TypeORM的使用和API，感觉TypeScript + TypeORM的组合非常强大！装饰器的使用让代码更加清晰，关系映射的配置也很直观。特别是QueryBuilder的链式调用，让复杂查询的构建变得简单。

## 📝 学习笔记

### 重要概念

- **@Entity**: 定义实体类，对应数据库表
- **@PrimaryGeneratedColumn**: 主键字段，自动生成
- **@Column**: 普通字段，可配置类型、长度、约束等
- **@OneToOne**: 一对一关系装饰器
- **@OneToMany/@ManyToOne**: 一对多关系装饰器
- **@ManyToMany**: 多对多关系装饰器

### 常用API

- **Repository.find()**: 查找多条记录
- **Repository.findOne()**: 查找单条记录
- **Repository.save()**: 保存或更新记录
- **QueryBuilder**: 构建复杂查询
- **relations**: 加载关联数据

---

**学习进度**: Day 03/100 ✅  
**心情**: 😊 对TypeORM有了全面的了解  
**明日目标**: 学习TypeORM的迁移和性能优化
