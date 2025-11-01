import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateLoginDto {
  @IsEmail({}, { message: 'Debe ser un correo válido' })
  usuario_correo!: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  usuario_contrasena!: string;
}
