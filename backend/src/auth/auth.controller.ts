import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Res,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import dayjs from 'dayjs';
import * as bcrypt from 'bcrypt-ts';
import { randomUUID } from 'crypto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /* ---------- регистрация ---------- */
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  /* ---------- логин ---------- */
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response, // ← passthrough
  ) {
    const { accessToken, refreshToken } = await this.auth.login(
      dto,
      req.headers['user-agent'],
      req.ip,
    );

    this.setCookies(res, accessToken, refreshToken); // ставим куки
    return { role: 'student' }; // обычный объект!
  }

  /* ---------- refresh ---------- */
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const raw = req.cookies.refreshToken;
    if (!raw) {
      res.status(401).send();
      return;
    }

    try {
      const { sid } = this.jwt.verify(raw, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      }) as { sid: string };

      const session = await req.app.get('PrismaService').session.findUnique({
        where: { refreshHash: sid },
        include: { user: { include: { roles: true } } },
      });
      if (!session || session.expiresAt < new Date())
        throw new Error('session');

      await this.auth.invalidateSession(sid);

      const user = session.user;
      const accessToken = this.auth['signAccess'](user); // приватный метод
      const newRaw = randomUUID();
      const newHash = await bcrypt.hash(newRaw, 10);

      await req.app.get('PrismaService').session.create({
        data: {
          userId: user.id,
          refreshHash: newHash,
          userAgent: req.headers['user-agent'],
          ip: req.ip,
          expiresAt: dayjs().add(7, 'days').toDate(),
        },
      });

      const refreshToken = this.auth['signRefresh']({ sid: newHash });
      this.setCookies(res, accessToken, refreshToken);
      res.json({ role: user.roles[0].name });
      return;
    } catch {
      res.status(401).send();
      return;
    }
  }

  /* ---------- logout ---------- */
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const raw = req.cookies?.refreshToken;

    if (raw) {
      try {
        const { sid } = this.jwt.verify(raw, {
          secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        }) as { sid: string };

        /*  удаляем запись через сервис  */
        await this.auth.invalidateSession(sid);
      } catch {
        /* токен испорчен / истёк — просто игнорируем */
      }
    }

    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    return { success: true }; // 200 OK
  }

  /* ---------- helper ---------- */
  private setCookies(res: Response, access: string, refresh: string) {
    res
      .cookie('accessToken', access, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 1000 * 60 * 15,
      })
      .cookie('refreshToken', refresh, {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
  }
}
