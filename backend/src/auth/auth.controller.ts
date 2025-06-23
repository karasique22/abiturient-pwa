import {
  Controller,
  Post,
  Body,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt-ts';
import dayjs from 'dayjs';
import { randomUUID } from 'crypto';

@Controller('auth')
export class AuthController {
  private readonly isProd: boolean = process.env.NODE_ENV === 'production';
  constructor(
    private readonly auth: AuthService,
    private readonly jwt: JwtService,
    private readonly cfg: ConfigService,
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
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.auth.login(
      dto,
      req.headers['user-agent'],
      req.ip,
    );

    this.setCookies(res, accessToken, refreshToken);
    return { role: 'student' };
  }

  /* ---------- refresh ---------- */
  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const raw = req.cookies.refreshToken;
    if (!raw) return res.status(401).send();

    try {
      const { sid } = this.jwt.verify(raw, {
        secret: this.cfg.get<string>('JWT_REFRESH_SECRET'),
      }) as { sid: string };

      const prisma = req.app.get('PrismaService');
      const session = await prisma.session.findUnique({
        where: { refreshHash: sid },
        include: { user: { include: { roles: true } } },
      });
      if (!session || session.expiresAt < new Date()) throw new Error();

      await this.auth.invalidateSession(sid);

      const user = session.user;
      const accessToken = this.auth['signAccess'](user);
      const newRaw = randomUUID();
      const newHash = await bcrypt.hash(newRaw, 10);

      await prisma.session.create({
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

      return { role: user.roles[0].name };
    } catch {
      return res.status(401).send();
    }
  }

  /* ---------- logout ---------- */
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const raw = req.cookies.refreshToken;

    if (raw) {
      try {
        const { sid } = this.jwt.verify(raw, {
          secret: this.cfg.get<string>('JWT_REFRESH_SECRET'),
        }) as { sid: string };
        await this.auth.invalidateSession(sid);
      } catch {
        /* игнорируем повреждённый / просроченный токен */
      }
    }

    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    return { success: true };
  }

  /* ---------- helper ---------- */
  private setCookies(res: Response, access: string, refresh: string) {
    const common = {
      httpOnly: true,
      secure: this.isProd,      // обязателен https в продакшене
      sameSite: 'lax' as const, // кука остаётся first-party
      path: '/',
    };

    res
      .cookie('accessToken', access, {
        ...common,
        maxAge: 15 * 60 * 1000,            // 15 мин
      })
      .cookie('refreshToken', refresh, {
        ...common,
        maxAge: 7 * 24 * 60 * 60 * 1000,   // 7 дней
      });
  }
}

