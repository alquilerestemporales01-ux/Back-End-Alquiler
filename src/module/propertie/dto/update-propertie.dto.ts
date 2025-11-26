import { PartialType } from '@nestjs/swagger';
import { CreatePropertieDto } from './create-propertie.dto';

export class UpdatePropertieDto extends PartialType(CreatePropertieDto) {}
