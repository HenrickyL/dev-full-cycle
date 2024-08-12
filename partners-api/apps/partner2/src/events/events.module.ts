import { Module } from '@nestjs/common';
import { EventsCoreModule, EventsService } from '@app/core';

@Module({
  imports: [EventsCoreModule],
  providers: [EventsService],
})
export class EventsModule {}
