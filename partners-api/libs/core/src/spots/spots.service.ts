import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotStatusEnum } from './dto/SpotStatusEnum';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '_infra/Exceptions';

type CreateSpotInput = CreateSpotDto & { eventId: string };

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateSpotInput) {
    const event = await this.prismaService.event.findFirst({
      where: { id: dto.eventId },
    });
    if (!event) {
      throw new NotFoundException('Event Not Found');
    }
    return this.prismaService.spot.create({
      data: {
        ...dto,
        status: SpotStatusEnum.AVAILABLE,
      },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: { eventId },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findFirst({
      where: { eventId: eventId, id: spotId },
    });
  }

  update(eventId: string, spotId: string, dto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      where: { eventId: eventId, id: spotId },
      data: dto,
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({
      where: { eventId: eventId, id: spotId },
    });
  }
}
