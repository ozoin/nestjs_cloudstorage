import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid password');
    }

    const { password: hashedPassword, ...result } = user;
    return result;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.create(dto);
      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Registration error');
    }
  }
  // async login(user: UserEntity) {
  //   return {
  //     token: this.jwtService.sign({ id: user.id }),
  //   };
  // }
  async login(user: UserEntity) {
    try {
      return { token: this.jwtService.sign({ id: user.id }) };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Login error');
    }
  }


  // async login(email, psw) {
  //   try {
  //     const user = await this.validateUser(email, psw);
  //     // const payload = { sub: user.id, username: user.email };
  //     console.log('WE ARE HERE')
  //     return {
  //       access_token: await this.jwtService.sign({id:user.id}),
  //     };
  //   } catch (err) {
  //     throw new ForbiddenException('Login error');
  //   }
  // }
}
