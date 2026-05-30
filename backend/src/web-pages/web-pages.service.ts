import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebPageDto } from './dto/create-web-page.dto';
import { UpdateWebPageDto } from './dto/update-web-page.dto';

@Injectable()
export class WebPagesService {
  constructor(private prisma: PrismaService) {}

  async create(createWebPageDto: CreateWebPageDto) {
    const { resources, ...pageData } = createWebPageDto;

    return this.prisma.webPage.create({
      data: {
        ...pageData,
        
        resources: resources ? {
          create: resources
        } : undefined
      },
      include: {
        resources: true,
        category: true
      }
    });
  }

  findAll() {
    return this.prisma.webPage.findMany({
      include: {
        category: true,
        resources: true
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    const page = await this.prisma.webPage.findUnique({
      where: { id },
      include: { resources: true, category: true }
    });
    if (!page) throw new NotFoundException('Página no encontrada');
    return page;
  }

  async remove(id: string) {
    
    await this.prisma.resource.deleteMany({ where: { webPageId: id } });
    return this.prisma.webPage.delete({ where: { id } });
  }

async update(id: string, updateWebPageDto: UpdateWebPageDto) {
  const { resources, ...pageData } = updateWebPageDto;

  return this.prisma.$transaction(async (tx) => {

    if (resources) {
      await tx.resource.deleteMany({
        where: { webPageId: id },
      });
    }

    // 2. Mapeo limpio
    const resourcesToCreate = resources?.map((res) => ({
      url: res.url,
      publicId: res.publicId,
      format: res.format,
      type: res.type,
    })) || [];

  
    return tx.webPage.update({
      where: { id },
      data: {
        ...pageData,
        resources: resources 
          ? { create: resourcesToCreate } 
          : undefined,
      },
      include: {
        resources: true,
        category: true,
      },
    });
  }, {
    timeout: 10000 
  });
}
}