// src/login/login.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 🔹 Inicio de sesión
  async login(body: any) {
    const { usuario_correo, usuario_contrasena } = body;

    // 1️⃣ Buscar por correo
    const user = await this.prisma.usuario.findFirst({
      where: { usuario_correo },
    });

    if (!user) {
      return { success: false, mensaje: 'Correo electrónico o contraseña incorrectos.' };
    }

    // 2️⃣ Comparar hash con bcrypt
    const ok = await bcrypt.compare(usuario_contrasena, user.usuario_contrasena);
    if (!ok) {
      return { success: false, mensaje: 'Correo electrónico o contraseña incorrectos.' };
    }

    // 3️⃣ Crear token JWT con datos básicos
    const token = await this.jwtService.signAsync(
      {
        sub: user.usuario_id,
        correo: user.usuario_correo,
        rol: user.usuario_rol,
      },
      { expiresIn: '2h' },
    );

    // 4️⃣ Respuesta para el frontend
    return {
      success: true,
      mensaje: '¡Inicio de sesión exitoso!',
      token,
      data: {
        usuario_id: user.usuario_id,
        usuario_nombre: user.usuario_nombre,
        usuario_apellido: user.usuario_apellido,
        usuario_correo: user.usuario_correo,
        usuario_rol: user.usuario_rol,
      },
    };
  }

  // 🔹 Obtener todos (por defecto)
  findAll() {
    return 'This action returns all login';
  }

  // 🔹 Buscar por ID (dummy)
  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  // 🔹 Actualizar (dummy)
  update(id: number, updateLoginDto: any) {
    return `This action updates a #${id} login`;
  }

  // 🔹 Eliminar (dummy)
  remove(id: number) {
    return `This action removes a #${id} login`;
  }

  // ✅ 🔹 Nuevo: Obtener usuario por ID (usado en /login/perfil)
  async getUsuarioById(id: number) {
    return await this.prisma.usuario.findUnique({
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
}
