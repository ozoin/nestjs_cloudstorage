import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from 'src/files/entities/file.entity';
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

  create(dto: CreateUserDto) {
    const {email,fullName,password} = dto;
    bcrypt.hash(password,5, (err,hashedPassword) => {
      if (err) {
        console.log(err)
      } else {
        const updatedUser = {email,fullName,password:hashedPassword};
        return this.repository.save(updatedUser);
      }
    });
    // return this.repository.save(dto);
  }
}
