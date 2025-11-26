import { Injectable } from '@nestjs/common';
import { CreatePropertieDto } from './dto/create-propertie.dto';
import { UpdatePropertieDto } from './dto/update-propertie.dto';

@Injectable()
export class PropertieService {
  create(createPropertieDto: CreatePropertieDto) {
    return 'This action adds a new propertie';
  }

  findAll() {
    return `This action returns all propertie`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propertie`;
  }

  update(id: number, updatePropertieDto: UpdatePropertieDto) {
    return `This action updates a #${id} propertie`;
  }

  remove(id: number) {
    return `This action removes a #${id} propertie`;
  }
}
