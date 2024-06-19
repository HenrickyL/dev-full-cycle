import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { SpotsModule } from './spots/spots.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner2' }),
    EventsModule,
    SpotsModule,
  ],
})
export class Partner2Module {}
