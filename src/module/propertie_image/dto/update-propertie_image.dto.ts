import { PartialType } from '@nestjs/swagger';
import { CreatePropertieImageDto } from './create-propertie_image.dto';

export class UpdatePropertieImageDto extends PartialType(CreatePropertieImageDto) {}
