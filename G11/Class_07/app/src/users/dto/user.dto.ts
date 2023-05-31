import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/interfaces/role.enum';

export class CreateUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  // role: string;
  @ApiProperty()
  role: Role;
}
