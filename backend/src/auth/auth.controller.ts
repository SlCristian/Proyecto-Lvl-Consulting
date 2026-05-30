import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
register(@Body() registerDto: RegisterDto) {
  return this.authService.register(registerDto);
}


@UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: any) {
   
    return {
      message: "Bienvenido a tu perfil privado",
      user: req.user, 
    };
  }
}
