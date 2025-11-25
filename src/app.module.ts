import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RegisterDateMiddleware } from './middlewares/registerDate.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { DataSourceOptions } from 'typeorm';
import { AuthModule } from './module/auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RegisterDateMiddleware).forRoutes('*');
  }
}
