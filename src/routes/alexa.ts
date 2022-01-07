import { AlexaRequestDTO } from '@dtos/alexa';
import buildAlexaResponse from '@utils/buildAlexaResponse';
import { Router, Request, Response } from 'express';

const routes = Router();

routes.post('/', (req: Request, res: Response) => {
  const body = req?.body?.request as AlexaRequestDTO;
  const requestType = body?.type;
  const intent = body?.intent?.name;

  if (requestType === 'LaunchRequest') {
    console.log('LAUNCH');
  } else if (requestType === 'SessionEndedRequest') {
    console.log('SESSION ENDED');
  } else if (requestType === 'IntentRequest') {
    switch (intent) {
      case 'Authentication':
        console.log(body.intent);
        break;
      case 'ListBeersWithFilters':
        console.log(body.intent);
        break;
      default:
        console.log(req.body.request.intent.name);
        break;
    }
  }

  return res.json(buildAlexaResponse('Teste', true, 'Teste'));
});

export default routes;
