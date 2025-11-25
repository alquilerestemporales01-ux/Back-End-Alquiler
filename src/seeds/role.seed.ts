import { Role } from 'src/module/roles/entities/role.entity';
import { DataSource } from 'typeorm';

export async function seedRoles(dataSource: DataSource): Promise<void> {
  const roleRepository = dataSource.getRepository(Role);

  const roles = [
    {
      name: 'ADMIN',
      description: 'Administrador del sistema',
      permissions: {
        properties: ['create', 'read', 'update', 'delete'],
        bookings: ['create', 'read', 'update', 'delete'],
        users: ['create', 'read', 'update', 'delete'],
        employees: ['create', 'read', 'update', 'delete'],
      },
    },
    {
      name: 'CLIENT',
      description: 'Cliente que reserva propiedades',
      permissions: {
        bookings: ['create', 'read'],
        reviews: ['create', 'read'],
        properties: ['read'],
      },
    },
    {
      name: 'CLEANER',
      description: 'Personal de limpieza',
      permissions: {
        cleaningTasks: ['read', 'update'],
        properties: ['read'],
      },
    },
    {
      name: 'KEY_KEEPER',
      description: 'Guarda llaves',
      permissions: {
        keyHandoverTasks: ['read', 'update'],
        properties: ['read'],
      },
    },
  ];

  for (const roleData of roles) {
    const existingRole = await roleRepository.findOne({
      where: { name: roleData.name },
    });

    if (!existingRole) {
      await roleRepository.save(roleData);
      console.log(`✅ Rol creado: ${roleData.name}`);
    } else {
      console.log(`⚠️ Rol ya existe: ${roleData.name}`);
    }
  }
}
