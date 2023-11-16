import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

const normalizeFileName = (req, file, callback) => {
  const fileName = file.originalname.split('.').pop();

  callback(null, `${uuidv4()}.${fileName}`);
};

export const fileFilterHelper = (req,file,callback) => {
  const maxFileSize = 1024*1024*5
  if (file.size>maxFileSize){
    return callback(new BadRequestException('File size exceeds the maximum allowed'))
  }
  callback(null,true)
}

export const fileStorage = diskStorage({
  destination: './uploads',
  filename:normalizeFileName
});
