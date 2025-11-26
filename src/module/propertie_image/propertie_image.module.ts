import { Module } from '@nestjs/common';
import { PropertieImageService } from './propertie_image.service';
import { PropertieImageController } from './propertie_image.controller';

@Module({
  controllers: [PropertieImageController],
  providers: [PropertieImageService],
})
export class PropertieImageModule {}
