import { Role } from 'src/module/roles/entities/role.entity';
import { DataSource } from 'typeorm';

export async function seedRoles(dataSource: DataSource): Promise<void> {
  const roleRepository = dataSource.getRepository(Role);

  const roles = [
    {
      name: 'SUPER_ADMIN',
      description: 'Super Administrador con acceso total al sistema',
      permissions: {
        properties: ['create', 'read', 'update', 'delete'],
        bookings: ['create', 'read', 'update', 'delete', 'cancel'],
        users: ['create', 'read', 'update', 'delete', 'ban', 'unban'],
        employees: ['create', 'read', 'update', 'delete', 'activate', 'deactivate'],
        roles: ['create', 'read', 'update', 'delete'],
        reviews: ['create', 'read', 'update', 'delete', 'moderate'],
        payments: ['create', 'read', 'update', 'delete', 'refund'],
        notifications: ['create', 'read', 'update', 'delete', 'send'],
        cleaningTasks: ['create', 'read', 'update', 'delete', 'assign', 'complete'],
        keyHandoverTasks: ['create', 'read', 'update', 'delete', 'assign', 'complete'],
        availability: ['create', 'read', 'update', 'delete'],
        propertyImages: ['create', 'read', 'update', 'delete', 'upload'],
        employeePropertyAssignments: ['create', 'read', 'update', 'delete'],
        system: ['backup', 'restore', 'logs', 'settings', 'analytics'],
      },
    },
    {
      name: 'ADMIN',
      description: 'Administrador del sistema',
      permissions: {
        properties: ['create', 'read', 'update', 'delete'],
        propertyImages: ['create', 'read', 'update', 'delete', 'upload'],
        availability: ['create', 'read', 'update', 'delete'],
        bookings: ['create', 'read', 'update', 'delete', 'cancel'],
        users: ['create', 'read', 'update', 'delete', 'ban', 'unban'],
        employees: ['create', 'read', 'update', 'delete', 'activate', 'deactivate'],
        notifications: ['create', 'read', 'update', 'delete', 'send'],
        cleaningTasks: ['create', 'read', 'update', 'delete', 'assign', 'complete'],
        keyHandoverTasks: ['create', 'read', 'update', 'delete', 'assign', 'complete'],
        employeePropertyAssignments: ['create', 'read', 'update', 'delete'],
        reviews: ['create', 'read', 'update', 'delete', 'moderate'],
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
