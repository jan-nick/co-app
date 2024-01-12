import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Auth, LoginError } from '@co-app/types';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { LogoutDto } from './dto/logout.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(
        `No user found for email: ${email}`,
        LoginError.UserNotFound
      );
    }

    const passwordValid = await compare(password, user?.password);
    if (!passwordValid) {
      throw new UnauthorizedException(
        'Invalid password',
        LoginError.InvalidCredentials
      );
    }

    return user;
  }

  async login({ email }: LoginDto): Promise<Auth> {
    const user = await this.usersService.findOneByEmail(email);
    const tokens = await this.getToken(user.id, email);

    return { ...tokens, user };
  }

  async signUp(signUpDto: SignUpDto): Promise<Auth> {
    const user = await this.usersService.create(signUpDto);

    const tokens = await this.getToken(user.id, signUpDto.email);

    return { ...tokens, user };
  }

  async logout({ accessToken, userId }: LogoutDto): Promise<void> {
    await this.usersService.update(userId, { accessToken });
  }

  private async getToken(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: userId,
        email,
      },
      {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }
    );

    return { accessToken };
  }
}
