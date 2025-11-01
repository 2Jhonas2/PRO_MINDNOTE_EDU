import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req,
} from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { JwtAuthGuard } from 'src/login/jwt-auth.guard';

@Controller('notificaciones')
@UseGuards(JwtAuthGuard)
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Post()
  async create(@Body() body: any) {
    const data = await this.notificacionesService.create(body);
    return { success: true, data };
  }

  @Get()
  async listar(@Req() req: any) {
    const usuario_id = req.user.sub;
    const data = await this.notificacionesService.listarPorUsuario(usuario_id);
    return { success: true, data };
  }

  @Get('contador')
  async contador(@Req() req: any) {
    const usuario_id = req.user.sub;
    const noLeidas = await this.notificacionesService.contarNoLeidas(usuario_id);
    return { success: true, noLeidas };
  }

  // ✅ la ruta correcta que estás llamando desde el front
  @Patch('marcar-todas')
  async marcarTodas(@Req() req: any) {
    const usuario_id = req.user.sub;
    const data = await this.notificacionesService.marcarTodas(usuario_id);
    return { data }; // { success:true, updated: n }
  }

  @Patch(':id')
  async marcarLeida(@Param('id') id: string, @Req() req: any) {
    const usuario_id = req.user.sub;
    const data = await this.notificacionesService.marcarLeida(Number(id), usuario_id);
    return { success: true, data };
  }

  // (opcionales admin/legacy)
  @Get('admin/todas')
  async findAll() {
    const data = await this.notificacionesService.findAll();
    return { success: true, data };
  }

  @Get('admin/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.notificacionesService.findOne(+id);
    return { success: true, data };
  }

  @Patch('admin/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    const data = await this.notificacionesService.update(+id, body);
    return { success: true, mensaje: 'Notificación actualizada exitosamente', id, data };
  }

  @Delete('admin/:id')
  async remove(@Param('id') id: string) {
    const data = await this.notificacionesService.remove(+id);
    return { success: true, ...data };
  }
}
