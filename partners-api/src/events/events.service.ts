import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}
  create(dto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...dto,
        date: new Date(dto.date),
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findFirst({
      where: { id: id },
    });
  }

  update(id: string, dto: UpdateEventDto) {
    return this.prismaService.event.update({
      data: dto,
      where: { id: id },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
