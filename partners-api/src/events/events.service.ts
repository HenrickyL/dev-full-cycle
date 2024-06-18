import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { BadRequestException } from 'src/_infra/Exceptions';
import { TicketStatus } from '@prisma/client';
import { SpotStatusEnum } from 'src/spots/dto/SpotStatusEnum';

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
      data: dto.date
        ? {
            ...dto,
            date: new Date(dto.date),
          }
        : dto,
      where: { id: id },
    });
  }

  remove(id: string) {
    return this.prismaService.event.delete({ where: { id: id } });
  }
  async reserveSpot(dto: ReserveSpotDto & { eventId: string }) {
    // select * from Spot where name in (`A1`, `A2`)
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId: dto.eventId,
        name: {
          in: dto.spots,
        },
      },
    });
    if (spots.length !== dto.spots.length) {
      const foundSpotsName = spots.map((spot) => spot.name);
      const notFoundSpots = dto.spots.filter(
        (spotName) => !foundSpotsName.includes(spotName),
      );
      throw new BadRequestException(
        `Spots "${notFoundSpots.join(', ')}" not found`,
      );
    }
    await this.prismaService.reservationHistory.createMany({
      data: spots.map((spot) => ({
        spotId: spot.id,
        ticketKind: dto.ticket_kind,
        email: dto.email,
        status: TicketStatus.RESERVED,
      })),
    });
    await this.prismaService.spot.updateMany({
      where: {
        id: { in: spots.map((spot) => spot.id) },
      },
      data: {
        status: SpotStatusEnum.RESERVED,
      },
    });
    //varias queries
    const tickets = await Promise.all(
      spots.map((spot) =>
        this.prismaService.ticket.create({
          data: {
            spotId: spot.id,
            ticketKind: dto.ticket_kind,
            email: dto.email,
          },
        }),
      ),
    );

    return tickets;
  }
}
