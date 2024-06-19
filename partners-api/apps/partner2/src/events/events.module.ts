import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from '@app/core';

@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
