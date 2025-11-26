import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertieService } from './propertie.service';
import { CreatePropertieDto } from './dto/create-propertie.dto';
import { UpdatePropertieDto } from './dto/update-propertie.dto';

@Controller('propertie')
export class PropertieController {
  constructor(private readonly propertieService: PropertieService) {}

  @Post()
  create(@Body() createPropertieDto: CreatePropertieDto) {
    return this.propertieService.create(createPropertieDto);
  }

  @Get()
  findAll() {
    return this.propertieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertieDto: UpdatePropertieDto) {
    return this.propertieService.update(+id, updatePropertieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertieService.remove(+id);
  }
}
