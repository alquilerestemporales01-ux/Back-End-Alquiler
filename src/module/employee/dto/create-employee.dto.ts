import { PickType, ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'This field must contain the users name',
    example: 'Carli',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  name: string;

  @ApiProperty({
    description: 'This field must contain the users email address',
    example: 'carli@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'This field must contain the phone number',
    example: 1234567890,
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Dirección completa',
    example: 'Calle Falsa 123',
    required: false,
  })
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'This field must contain the password',
    example: 'Carli87@',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message:
      'The password must have at least one uppercase letter, one lowercase letter, one number, and one special character. (!@#$%^&*)',
  })
  password: string;

  @ApiProperty({
    description: 'This field must contain the confirm password',
    example: 'Carli87@',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message:
      'The confirmPassword must have at least one uppercase letter, one lowercase letter, one number, and one special character. (!@#$%^&*)',
  })
  confirmPassword: string;

  @ApiProperty({
    description: 'This field must contain the Employee Role',
    example: 'KEY_KEEPER',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 80)
  Role: string;
}

export class LoginEmployeeDto extends PickType(CreateEmployeeDto, ['email', 'password']) {}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}

export class CreateUserDbDto extends OmitType(CreateEmployeeDto, ['confirmPassword'] as const) {}

export class UpdateUserDbDto extends OmitType(UpdateEmployeeDto, ['confirmPassword', 'email'] as const) {}
