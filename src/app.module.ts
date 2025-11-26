import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RegisterDateMiddleware } from './middlewares/registerDate.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { DataSourceOptions } from 'typeorm';
import { UsersModule } from './module/users/users.module';
import { AuthsModule } from './module/auth/auths.module';
import { RolesModule } from './module/roles/roles.module';
import { ReviewModule } from './module/review/review.module';
import { PropertieImageModule } from './module/propertie_image/propertie_image.module';
import { PropertieModule } from './module/propertie/propertie.module';
import { PaymentsModule } from './module/payments/payments.module';
import { NotificationModule } from './module/notification/notification.module';
import { KeyHandoverTaskModule } from './module/key_handover_task/key_handover_task.module';
import { EmployeePropertyAssignmentModule } from './module/employee_property_assignment/employee_property_assignment.module';
import { EmployeeModule } from './module/employee/employee.module';
import { CleaningTaskModule } from './module/cleaning_task/cleaning_task.module';
import { BookingModule } from './module/booking/booking.module';
import { AvailabilityModule } from './module/availability/availability.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DataSourceOptions>('typeorm');
        if (!config) {
          throw new Error('TypeORM config is missing');
        }
        return config;
      },
    }),
    AuthsModule,
    UsersModule,
    RolesModule,
    ReviewModule,
    PropertieImageModule,
    PropertieModule,
    PaymentsModule,
    NotificationModule,
    KeyHandoverTaskModule,
    EmployeePropertyAssignmentModule,
    EmployeeModule,
    CleaningTaskModule,
    BookingModule,
    AvailabilityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RegisterDateMiddleware).forRoutes('*');
  }
}
