import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { Role } from 'src/interfaces/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);

    if (!user) {
      throw new NotFoundException(
        `User with username: ${username} was not found.`,
      );
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (user && isPasswordValid) {
      const { password, ...restProperties } = user;

      return {
        ...restProperties,
      };
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: CreateUserDto) {
    const userToSave = {
      username: userDto.username,
      password: bcrypt.hashSync(userDto.password, 10),
      // role: userDto.role as Role,
      role: userDto.role,
    };

    const id = await this.usersService.save(userToSave);

    return id;
  }
}
