import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertieImageService } from './propertie_image.service';
import { CreatePropertieImageDto } from './dto/create-propertie_image.dto';
import { UpdatePropertieImageDto } from './dto/update-propertie_image.dto';

@Controller('propertie-image')
export class PropertieImageController {
  constructor(private readonly propertieImageService: PropertieImageService) {}

  @Post()
  create(@Body() createPropertieImageDto: CreatePropertieImageDto) {
    return this.propertieImageService.create(createPropertieImageDto);
  }

  @Get()
  findAll() {
    return this.propertieImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertieImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertieImageDto: UpdatePropertieImageDto) {
    return this.propertieImageService.update(+id, updatePropertieImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertieImageService.remove(+id);
  }
}
