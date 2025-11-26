import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { DataSource, Repository } from 'typeorm';
import { seedRoles } from 'src/seeds/role.seed';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async runSeeds(): Promise<{ message: string; roles: string[] }> {
    this.logger.log('🌱 Ejecutando seeds de roles...');

    try {
      await seedRoles(this.dataSource);

      // Obtener todos los roles creados
      const roles = await this.roleRepository.find({
        select: ['name', 'description'],
      });

      this.logger.log('✅ Seeds ejecutados correctamente');

      return {
        message: 'Seeds ejecutados exitosamente',
        roles: roles.map((r) => r.name),
      };
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : typeof error === 'string' ? error : JSON.stringify(error);

      this.logger.error(`❌ Error al ejecutar seeds: ${message}`);
      throw new Error(`Error al ejecutar seeds: ${message}`);
    }
  }
}
