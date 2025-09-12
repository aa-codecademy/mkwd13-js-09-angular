import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { user } = await this.authService.register(createUserDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { user, access_token } = await this.authService.login(loginDto);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('purchase-loyal-card')
  async purchaseLoyalCard(@Request() req: Request & { user: { sub: number } }) {
    return await this.authService.purchaseLoyalCard(req.user.sub);
  }
}
