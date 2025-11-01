import { Module } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/login/jwt-auth.guard'; // 👈 importa el guard

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'cambia_este_secreto', // 👈 MISMO secreto que usas al firmar
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [NotificacionesController],
  providers: [NotificacionesService, PrismaService, JwtAuthGuard], // 👈 registra el guard
})
export class NotificacionesModule {}
