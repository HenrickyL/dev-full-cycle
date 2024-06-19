import { TicketKindEnum } from './TicketKindEnum';

export interface ReserveSpotRequest {
  spots: string[];
  ticket_kind: TicketKindEnum;
  email: string;
}
