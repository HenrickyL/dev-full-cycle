import { Module } from '@nestjs/common';
import { EventsCoreModule } from '@app/core';
import { EventsController } from './events.controller';

@Module({
  imports: [EventsCoreModule],
  providers: [EventsController],
})
export class EventsModule {}
