import { Server } from 'socket.io';

export type AlexaRequestType =
  | 'LaunchRequest'
  | 'SessionEndedRequest'
  | 'IntentRequest';

export type AlexaIntent =
  | 'Authentication'
  | 'ListBeersWithFilters'
  | 'ListFavoriteBeers';

export type ListBeersWithFiltersSlots = 'brand' | 'type' | 'code';

export interface AlexaRequestDTO {
  type: AlexaRequestType;
  requestId: string;
  locale: string;
  timestamp: string;
  intent: {
    name: AlexaIntent;
    confirmationStatus: string;
    slots: {
      code: {
        name: string;
        value: string;
        confirmationStatus: string;
        source: string;
        slotValue: { type: string; value: string };
      };
      brand: {
        name: string;
        value: string;
        confirmationStatus: string;
        source: string;
        slotValue: { type: string; value: string };
      };
      type: {
        name: string;
        value: string;
        confirmationStatus: string;
        source: string;
        slotValue: { type: string; value: string };
      };
    };
  };
}

export type ServerType = Server;
