import { Router, Request, Response } from 'express';

const routes = Router();

function buildResponse(
  speechText: string,
  shouldEndSession: boolean,
  cardText: string,
) {
  const speechOutput = '<speak>' + speechText + '</speak>';
  var jsonObj = {
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
        content: cardText,
        text: cardText,
      },
    },
  };
  return jsonObj;
}

routes.get('/', (req: Request, res: Response) => {
  console.log('CHEGOU AQUI');
  return res.json(buildResponse('Teste', true, 'Teste'));
});

export default routes;
