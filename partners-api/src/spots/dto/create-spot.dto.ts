import { SpotStatusEnum } from './SpotStatusEnum';

export class CreateSpotDto {
  name: string;
  eventId: string;
  status: SpotStatusEnum;
}
