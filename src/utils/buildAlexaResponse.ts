export default function buildAlexaResponse(
  speechText: string,
  shouldEndSession: boolean,
  cardText: string,
) {
  const speechOutput = '<speak>' + speechText + '</speak>';
  var jsonObj = {
    version: '1.0',
    response: {
      shouldEndSession: false,
      outputSpeech: {
        type: 'SSML',
        ssml: speechOutput,
      },
      card: {
        type: 'Simple',
        title: 'Cervejas do Vale',
        content: cardText,
        text: cardText,
      },
    },
  };
  return jsonObj;
}
