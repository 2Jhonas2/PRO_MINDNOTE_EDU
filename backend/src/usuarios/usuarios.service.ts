import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // Crear usuario con contraseña encriptada
  async create(body: any) {
    try {
      const hashedPassword = await bcrypt.hash(body.usuario_contrasena, SALT_ROUNDS);

      return await this.prisma.usuario.create({
        data: {
          usuario_nombre: body.usuario_nombre,
          usuario_apellido: body.usuario_apellido,
          usuario_correo: body.usuario_correo,
          usuario_contrasena: hashedPassword, // Guardamos el HASH
          usuario_rol: body.usuario_rol ?? 'usuario',
        },
        select: {
          usuario_id: true,
          usuario_nombre: true,
          usuario_apellido: true,
          usuario_correo: true,
          usuario_rol: true,
        },
      });
    } catch (e: any) {
      // P2002 = unique constraint failed (correo duplicado)
      if (e.code === 'P2002') {
        throw new ConflictException('El correo ya está registrado.');
      }
      throw e;
    }
  }

  // Listar usuarios (sin contraseña)
  async findAll() {
    return await this.prisma.usuario.findMany({
      orderBy: { usuario_id: 'desc' },
      select: {
        usuario_id: true,
        usuario_nombre: true,
        usuario_apellido: true,
        usuario_correo: true,
        usuario_rol: true,
      },
    });
  }

  // Obtener usuario por ID (sin contraseña)
  async findOne(id: number) {
    return await this.prisma.usuario.findFirst({
      where: { usuario_id: id },
      select: {
        usuario_id: true,
        usuario_nombre: true,
        usuario_apellido: true,
        usuario_correo: true,
        usuario_rol: true,
      },
    });
  }

  // Actualizar usuario. Si cambia la contraseña, se re-encripta.
  async update(id: number, body: any) {
    const data: any = { ...body };

    if (body.usuario_contrasena) {
      data.usuario_contrasena = await bcrypt.hash(body.usuario_contrasena, SALT_ROUNDS);
    }

    return await this.prisma.usuario.update({
      where: { usuario_id: id },
      data,
      select: {
        usuario_id: true,
        usuario_nombre: true,
        usuario_apellido: true,
        usuario_correo: true,
        usuario_rol: true,
      },
    });
  }

  // Eliminar usuario
  async remove(id: number) {
    await this.prisma.usuario.delete({ where: { usuario_id: id } });
    return { exito: true, mensaje: 'Usuario eliminado', id };
  }
}
