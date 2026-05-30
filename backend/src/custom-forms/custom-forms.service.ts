import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomFormDto } from './dto/create-custom-form.dto';
import { UpdateCustomFormDto } from './dto/update-custom-form.dto';

@Injectable()
export class CustomFormsService {
  constructor(private prisma: PrismaService) {}

  create(createCustomFormDto: CreateCustomFormDto) {
    return this.prisma.customForm.create({
      data: createCustomFormDto,
    });
  }

  findAll() {
    return this.prisma.customForm.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const form = await this.prisma.customForm.findUnique({ where: { id } });
    if (!form) throw new NotFoundException('Formulario no encontrado');
    return form;
  }

  update(id: string, updateCustomFormDto: UpdateCustomFormDto) {
    return this.prisma.customForm.update({
      where: { id },
      data: updateCustomFormDto,
    });
  }

  remove(id: string) {
    return this.prisma.customForm.delete({ where: { id } });
  }
}