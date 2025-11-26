import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateEmployeeDto, UpdateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { ResponseEmployeeDto } from './interface/IUserResponseDto';
import { Role } from '../roles/entities/role.entity';
import { AuthValidations } from '../auth/validate/auth.validate';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService,
  ) {}

  async signup(data: CreateEmployeeDto): Promise<ResponseEmployeeDto> {
    const { password, confirmPassword, Role: roleName, ...employeeData } = data;

    AuthValidations.validatePasswordMatch(password, confirmPassword);

    const existingEmailEmployee = await this.employeeRepository.findOne({
      where: { email: employeeData.email },
    });

    if (existingEmailEmployee) {
      AuthValidations.validateEmailIsNotTaken(existingEmailEmployee.email);
    }

    try {
      const role = await this.roleRepository.findOne({
        where: { name: roleName },
      });

      if (!role) {
        throw new NotFoundException(`Rol "${roleName}" no encontrado`);
      }

      const hashedPassword = await AuthValidations.hashPassword(password);

      const employeeCount = await this.employeeRepository.count();
      const employeeCode = `EMP-${String(employeeCount + 1).padStart(3, '0')}`;

      const newEmployee = this.employeeRepository.create({
        ...employeeData,
        employee_code: employeeCode,
        password: hashedPassword,
        role,
      });

      const savedEmployee = await this.employeeRepository.save(newEmployee);

      this.logger.log(`Empleado registrado exitosamente: ${savedEmployee.email}`);

      return ResponseEmployeeDto.toDTO(savedEmployee);
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);

      this.logger.error(`Error al registrar empleado: ${errMessage}`);

      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }

      AuthValidations.handleSignupError(error);
    }
  }

  // ============================================
  // OBTENER TODOS LOS EMPLEADOS
  // ============================================
  async findAll(): Promise<ResponseEmployeeDto[]> {
    const employees = await this.employeeRepository.find({
      relations: ['role'],
      order: { createdAt: 'DESC' },
    });

    return ResponseEmployeeDto.toDTOList(employees);
  }

  async findOne(id: string): Promise<ResponseEmployeeDto> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return ResponseEmployeeDto.toDTO(employee);
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return await this.employeeRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<ResponseEmployeeDto> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    // Si se actualiza la contraseña, hashearla
    if (updateEmployeeDto.password) {
      updateEmployeeDto.password = await AuthValidations.hashPassword(updateEmployeeDto.password);
    }

    // Si se actualiza el rol
    if (updateEmployeeDto.Role) {
      const role = await this.roleRepository.findOne({
        where: { name: updateEmployeeDto.Role },
      });

      if (!role) {
        throw new NotFoundException(`Rol "${updateEmployeeDto.Role}" no encontrado`);
      }

      employee.role = role;
    }

    // Actualizar campos
    Object.assign(employee, updateEmployeeDto);

    const updatedEmployee = await this.employeeRepository.save(employee);

    this.logger.log(`Empleado actualizado: ${updatedEmployee.email}`);

    return ResponseEmployeeDto.toDTO(updatedEmployee);
  }

  async remove(id: string): Promise<{ message: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    // Soft delete usando TypeORM
    await this.employeeRepository.softDelete(id);

    this.logger.log(`Empleado eliminado (soft delete): ${employee.email}`);

    return { message: `Empleado ${employee.name} eliminado exitosamente` };
  }

  async findByRole(roleName: string): Promise<ResponseEmployeeDto[]> {
    const employees = await this.employeeRepository.find({
      where: {
        role: { name: roleName },
      },
      relations: ['role'],
    });

    return ResponseEmployeeDto.toDTOList(employees);
  }
}
