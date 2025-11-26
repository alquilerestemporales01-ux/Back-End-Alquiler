import { Injectable } from '@nestjs/common';
import { CreatePropertieImageDto } from './dto/create-propertie_image.dto';
import { UpdatePropertieImageDto } from './dto/update-propertie_image.dto';

@Injectable()
export class PropertieImageService {
  create(createPropertieImageDto: CreatePropertieImageDto) {
    return 'This action adds a new propertieImage';
  }

  findAll() {
    return `This action returns all propertieImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertieImage`;
  }

  update(id: number, updatePropertieImageDto: UpdatePropertieImageDto) {
    return `This action updates a #${id} propertieImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertieImage`;
  }
}
