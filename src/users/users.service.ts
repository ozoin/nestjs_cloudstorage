import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { FileEntity } from '../../src/files/entities/file.entity';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return this.repository.findOneBy({
      email,
    });
  }

  async findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  async deleteAll() {
    const allUsers = await this.repository.find();
    if (allUsers.length > 0) {
      allUsers.map(async (user) => {
        const { id } = user;
        await this.repository.delete({ id: id });
      });
    } else {
      throw new Error('Database is clear');
    }
    return this.repository.find();
  }

  async create(dto: CreateUserDto) {
    const { email, fullName, password } = dto;
    try {
      const hashedPassword = await bcrypt.hash(password, 5);
      const updatedUser = { email, fullName, password: hashedPassword };
      return await this.repository.save(updatedUser);
    } catch (err) {
      throw new ForbiddenException('Error in creating user data');
    }
  }
}
