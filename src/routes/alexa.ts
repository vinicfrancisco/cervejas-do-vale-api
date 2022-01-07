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
        const code = body?.intent?.slots?.code.value || '';
        console.log(code);
        break;
      case 'ListBeersWithFilters':
        const type = body?.intent?.slots?.type?.value || '';
        const brand = body?.intent?.slots?.brand?.value || '';

        console.log(type);
        console.log(brand);
        break;
      default:
        console.log(req.body.request.intent.name);
        break;
    }
  }

  return res.json(buildAlexaResponse('Teste', true, 'Teste'));
});

export default routes;
