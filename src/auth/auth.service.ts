import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
      }
  }
    return null;
  }

  async register(dto:CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto);
      return userData;
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Registration error')
    }
  }
}
