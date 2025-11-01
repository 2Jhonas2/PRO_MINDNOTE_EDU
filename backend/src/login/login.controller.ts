// src/login/login.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}

  // Endpoint principal de inicio de sesión
  @Post()
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.login(createLoginDto);
  }

  // Nuevo endpoint protegido para obtener el perfil del usuario
  @UseGuards(JwtAuthGuard)
  @Get('perfil')
  async getPerfil(@Req() req: any) {
    // req.user proviene del token decodificado
    const { sub: usuario_id, correo: usuario_correo, rol: usuario_rol } = req.user;

    // Si quieres traer el nombre completo desde BD:
    const user = await this.loginService.getUsuarioById(usuario_id);

    return {
      success: true,
      data: {
        usuario_id,
        usuario_nombre: user?.usuario_nombre || 'Usuario',
        usuario_apellido: user?.usuario_apellido || '',
        usuario_correo,
        usuario_rol,
      },
    };
  }

  // Métodos base
  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
