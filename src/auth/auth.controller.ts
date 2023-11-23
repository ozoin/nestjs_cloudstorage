import { CreateUserDto } from './../users/dto/create-user.dto';
import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
      private readonly authService: AuthService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiBody({type:CreateUserDto})
    async login(@Request() req) {
      return req.user;
    }

    @Post('register')
    register(@Body() dto:CreateUserDto) {
      return this.authService.register(dto)
    }
  }

