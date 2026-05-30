import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      // 1. Le decimos de dónde sacar el token (del header Authorization: Bearer ...)
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 2. Usamos la misma llave secreta que usamos para firmarlo
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  // 3. Esta función se ejecuta automáticamente si el token es válido
  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
      include: { role: true },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return user; // Lo que retornes aquí se guardará en "req.user"
  }
}