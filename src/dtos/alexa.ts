export type AlexaRequestType =
  | 'LaunchRequest'
  | 'SessionEndedRequest'
  | 'IntentRequest';

export type AlexaIntent = 'Authentication' | 'ListBeersWithFilters';

export interface AlexaRequestDTO {
  type: AlexaRequestType;
  requestId: string;
  locale: string;
  timestamp: string;
  intent: {
    name: AlexaIntent;
    confirmationStatus: string;
    slots: {
      [key: string]: {
        name: string;
        value: string;
        confirmationStatus: string;
        source: string;
        slotValue: { type: string; value: string };
      };
    };
  };
}
