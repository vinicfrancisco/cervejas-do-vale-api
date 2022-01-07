import { AlexaRequestDTO } from '@dtos/alexa';
import buildAlexaResponse from '@utils/buildAlexaResponse';
import { Router, Request, Response } from 'express';
import io from 'socket.io-client';

const routes = Router();

const socket = io('https://cervejas-do-vale.herokuapp.com');

routes.post('/', (req: Request, res: Response) => {
  const userId = req?.body?.session?.user?.userId;
  const body = req?.body?.request as AlexaRequestDTO;
  const requestType = body?.type;
  const intent = body?.intent?.name;

  console.log(userId);

  if (requestType === 'LaunchRequest') {
    console.log('LAUNCH');
  } else if (requestType === 'SessionEndedRequest') {
    console.log('SESSION ENDED');
  } else if (requestType === 'IntentRequest') {
    switch (intent) {
      case 'Authentication':
        const code = body?.intent?.slots?.code.value || '';
        console.log(code);
        socket.emit('teste', { hello: 'world' });
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
