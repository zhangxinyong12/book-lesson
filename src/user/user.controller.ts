import { Controller, Get, Post, Body, Patch, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('init')
  async init() {
    // 初始化用户 每次随机生成100条数据 用户名随机 密码随机 调用userService.create
    const adjectives = [
      'happy',
      'clever',
      'brave',
      'wise',
      'kind',
      'smart',
      'quick',
      'bright',
      'calm',
      'eager',
    ];
    const nouns = [
      'tiger',
      'eagle',
      'dragon',
      'phoenix',
      'wolf',
      'bear',
      'lion',
      'hawk',
      'fox',
      'owl',
    ];
    const colors = [
      'red',
      'blue',
      'green',
      'yellow',
      'purple',
      'orange',
      'pink',
      'brown',
      'black',
      'white',
    ];

    for (let i = 0; i < 100; i++) {
      const user = new User();

      // 生成随机用户名：形容词 + 名词 + 随机数字
      const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
      const randomNumber = Math.floor(Math.random() * 1000);
      user.name = `${randomAdjective}_${randomNoun}_${randomNumber}`;

      // 生成随机密码：颜色 + 随机字符串 + 随机数字
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomString = Math.random().toString(36).substring(2, 8);
      const randomPasswordNumber = Math.floor(Math.random() * 10000);
      user.password = `${randomColor}${randomString}${randomPasswordNumber}`;

      await this.userService.create(user);
    }
    return '初始化完成';
  }

  @Post('create')
  create(@Body() createUserDto: User) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: User) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
