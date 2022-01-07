export interface AlexaResponseProps {
  speechText: string;
  shouldEndSession: boolean;
}

export interface AlexaResponse {
  version: string;
  response: {
    shouldEndSession: boolean;
    outputSpeech: {
      type: string;
      ssml: string;
    };
    card: {
      type: string;
      title: string;
      content: string;
      text: string;
    };
  };
}

export default function buildAlexaResponse({
  shouldEndSession,
  speechText,
}: AlexaResponseProps): AlexaResponse {
  const speechOutput = '<speak>' + speechText + '</speak>';

  const response: AlexaResponse = {
    version: '1.0',
    response: {
      shouldEndSession: shouldEndSession,
      outputSpeech: {
        type: 'SSML',
        ssml: speechOutput,
      },
      card: {
        type: 'Simple',
        title: 'Cervejas do Vale',
        content: speechText,
        text: speechText,
      },
    },
  };

  return response;
}
