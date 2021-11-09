import { Router, Request, Response } from 'express';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import {
  RequestHandler,
  HandlerInput,
  SkillBuilders,
  getRequestType,
  getIntentName,
} from 'ask-sdk-core';
import { Response as AlexaResponse } from 'ask-sdk-model';

const skillBuilder = SkillBuilders.custom();
const skill = skillBuilder.create();
const adapter = new ExpressAdapter(skill, true, true);

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

routes.post(
  '/alexa',
  adapter.getRequestHandlers(),
  (req: Request, res: Response) => {
    // const response =
    return res.json(buildResponse('Teste', true, 'Teste'));
  },
);

export default routes;
