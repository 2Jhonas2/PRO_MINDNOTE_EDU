import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificacionesService {
  constructor(private prisma: PrismaService) {}

  // Crear notificación (si la generas desde backend)
  async create(body: any) {
    // body debe incluir al menos: notificacion_mensaje, tarea_id
    return await this.prisma.notificacion.create({
      data: body,
    });
  }

  // ADMIN: listar todas (no la usamos en el front)
  async findAll() {
    return await this.prisma.notificacion.findMany({
      orderBy: { notificacion_id: 'desc' },
    });
  }

  // ADMIN: una notificación por id (no la usamos en el front)
  async findOne(id: number) {
    return await this.prisma.notificacion.findFirst({
      where: { notificacion_id: id },
    });
  }

  // ADMIN: update genérico por id (no lo usamos en el front)
  async update(id: number, body: any) {
    return await this.prisma.notificacion.update({
      where: { notificacion_id: id },
      data: body,
    });
  }

  // Eliminar
  async remove(id: number) {
    await this.prisma.notificacion.delete({ where: { notificacion_id: id } });
    return { exito: true, mensaje: 'Notificación eliminada exitosamente', id };
  }

  // ====== FUNCIONALIDAD POR USUARIO AUTENTICADO ======

  // Listar por usuario (desde token)
  async listarPorUsuario(usuario_id: number) {
    return await this.prisma.notificacion.findMany({
      where: { tarea: { usuario_id } },
      orderBy: { notificacion_fechaEnvio: 'desc' },
      select: {
        notificacion_id: true,
        notificacion_mensaje: true,
        notificacion_fechaEnvio: true,
        notificacion_entregado: true,
        tarea_id: true,
      },
    });
  }

  // Contar no leídas del usuario
  async contarNoLeidas(usuario_id: number) {
    return await this.prisma.notificacion.count({
      where: { tarea: { usuario_id }, notificacion_entregado: false },
    });
  }

  // Marcar UNA como leída (verifica pertenencia)
  async marcarLeida(notificacion_id: number, usuario_id: number) {
    const notif = await this.prisma.notificacion.findUnique({
      where: { notificacion_id },
      select: { tarea: { select: { usuario_id: true } } },
    });

    if (!notif || notif.tarea.usuario_id !== usuario_id) {
      throw new NotFoundException('Notificación no encontrada.');
    }

    return await this.prisma.notificacion.update({
      where: { notificacion_id },
      data: { notificacion_entregado: true },
      select: { notificacion_id: true, notificacion_entregado: true },
    });
  }

  // Marcar TODAS como leídas
  async marcarTodas(usuario_id: number) {
    const res = await this.prisma.notificacion.updateMany({
      where: { tarea: { usuario_id }, notificacion_entregado: false },
      data: { notificacion_entregado: true },
    });
    return { success: true, updated: res.count };
  }
}
