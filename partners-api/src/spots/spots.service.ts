import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  create(dto: CreateSpotDto) {
    this.prismaService.spot.create({ data: dto });
  }

  findAll() {
    return `This action returns all spots`;
  }

  findOne(id: string) {
    return `This action returns a #${id} spot`;
  }

  update(id: string, updateSpotDto: UpdateSpotDto) {
    return `This action updates a #${id} spot`;
  }

  remove(id: string) {
    return `This action removes a #${id} spot`;
  }
}
