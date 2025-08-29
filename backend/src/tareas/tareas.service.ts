import { Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TareasService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(body:any) {
    return await this.prisma.tarea.create({
      data: body
    });
  }

  async findAll() {
    return await this.prisma.tarea.findMany({
      orderBy: { tarea_id: 'desc' }
    });
  }

  async findOne(id: number) {
    return await this.prisma.tarea.findFirst({
      where: { tarea_id: id }
    });
  }

  async update(id: number, body:any) {
    return await this.prisma.tarea.update({
      where: { tarea_id: id },
      data: body
  })
}

  async remove(id: number) {
    await this.prisma.tarea.delete({
      where: { tarea_id: id }
    });
    return { 
      "exito": true, 
      "mensaje": "Tarea eliminada con exito",
      "id": id,

  }
}
}
