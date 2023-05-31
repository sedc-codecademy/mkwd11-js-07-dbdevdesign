import { Injectable } from '@nestjs/common';
import { User, UserEnity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/interfaces/role.enum';

interface UserToSave {
  username: string;
  password: string;
  role: Role;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEnity)
    private readonly userRepository: Repository<UserEnity>,
  ) {}

  // Login
  async findOne(username: string) {
    const userFound = await this.userRepository.findOne({
      where: { username: username }, // give me the user with the matching userName
    });

    return userFound;
  }

  // Register
  async save(userToSave: UserToSave) {
    const userEntityInstance = this.userRepository.create(userToSave);

    const userSaved = await this.userRepository.save(userEntityInstance);

    return userSaved.id;
  }
}
