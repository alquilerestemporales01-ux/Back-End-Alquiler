import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/create-employee.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ResponseEmployeeDto } from './interface/IUserResponseDto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Sign up new user' })
  @ApiBody({ type: CreateEmployeeDto })
  @Post('signup')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  async signup(@Body() newEmployee: CreateEmployeeDto): Promise<ResponseEmployeeDto> {
    return await this.employeeService.signup(newEmployee);
  }

  @Get()
  async findAll(): Promise<ResponseEmployeeDto[]> {
    return await this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ResponseEmployeeDto {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): ResponseEmployeeDto {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.employeeService.remove(id);
  }
}
