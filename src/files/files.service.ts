import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilesService {

  constructor(
    @InjectRepository(FileEntity)
    private repository: Repository<FileEntity>
  ) {}

  findAll() {
    return this.repository.find()    
  }


}
