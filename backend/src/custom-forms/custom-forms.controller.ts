import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomFormsService } from './custom-forms.service';
import { CreateCustomFormDto } from './dto/create-custom-form.dto';
import { UpdateCustomFormDto } from './dto/update-custom-form.dto';

@Controller('custom-forms')
export class CustomFormsController {
  constructor(private readonly customFormsService: CustomFormsService) {}

  @Post()
  create(@Body() createCustomFormDto: CreateCustomFormDto) {
    return this.customFormsService.create(createCustomFormDto);
  }

  @Get()
  findAll() {
    return this.customFormsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customFormsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomFormDto: UpdateCustomFormDto) {
    return this.customFormsService.update(id, updateCustomFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customFormsService.remove(id);
  }
}