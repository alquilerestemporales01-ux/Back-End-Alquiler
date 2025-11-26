import { Module } from '@nestjs/common';
import { PropertieService } from './propertie.service';
import { PropertieController } from './propertie.controller';

@Module({
  controllers: [PropertieController],
  providers: [PropertieService],
})
export class PropertieModule {}
