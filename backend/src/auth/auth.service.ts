import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt-ts';
import dayjs from 'dayjs';
import { PrismaService } from '../database/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /* ---------- регистрация ---------- */
  async register(dto: RegisterDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        fullName: dto.fullName,
        roles: { connect: { name: 'student' } },
      },
      include: { roles: true },
    });
    return user;
  }

  /* ---------- логин ---------- */
  async login(dto: LoginDto, ua: string, ip: string) {
    const user = await this.validateUser(dto);

    const accessToken = this.signAccess(user);
    const rawRefresh = randomUUID();
    const refreshHash = await bcrypt.hash(rawRefresh, 10);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshHash,
        userAgent: ua,
        ip,
        expiresAt: dayjs().add(7, 'days').toDate(),
      },
    });

    const refreshToken = this.signRefresh({ sid: refreshHash });

    return { accessToken, refreshToken };
  }

  /* ---------- invalidate ---------- */
  async invalidateSession(hash: string) {
    await this.prisma.session.deleteMany({ where: { refreshHash: hash } });
  }

  /* ---------- helpers ---------- */
  private async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { roles: true },
    });
    if (!user) throw new UnauthorizedException('email');
    const ok = await bcrypt.compare(dto.password, user.password);
    if (!ok) throw new UnauthorizedException('pwd');
    return user;
  }

  private signAccess(user: { id: string; roles: { name: string }[] }) {
    return this.jwt.sign(
      { sub: user.id, role: user.roles[0].name },
      {
        expiresIn: '15m',
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      },
    );
  }

  private signRefresh(payload: { sid: string }) {
    return this.jwt.sign(payload, {
      expiresIn: '7d',
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
    });
  }
}
