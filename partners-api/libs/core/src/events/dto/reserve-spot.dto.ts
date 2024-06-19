import { TicketKindEnum } from './TicketKindEnum';

export interface ReserveSpotDto {
  spots: string[];
  ticket_kind: TicketKindEnum;
  email: string;
}
