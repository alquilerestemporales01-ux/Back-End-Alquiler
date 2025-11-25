import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './Entyties/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from '../auth/auths.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), forwardRef(() => AuthsModule), MailModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
