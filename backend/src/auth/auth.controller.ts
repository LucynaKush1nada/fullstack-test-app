import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        const { email, password, role } = registerDto;
        return this.authService.register(email, password, role);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const { email, password } = loginDto;
        return this.authService.login(email, password);
    }
}
