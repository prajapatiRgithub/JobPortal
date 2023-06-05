import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class RegistrationDto {
  @ApiProperty({
    example: 'Ram',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    example: 'Patel',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: 'abc017',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'abc@gmail.com',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Password',
    type: 'string',
    format: 'string',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    enum: ['Manager', 'Candidate'],
    type: 'string',
    required: true,
  })
  @IsEnum({
    Manager: 'Manager',
    Candidate: 'Candidate',
  })
  @IsNotEmpty()
  role: string;
}
