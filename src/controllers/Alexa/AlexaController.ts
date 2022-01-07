import { AlexaRequestDTO } from '@dtos/alexa';
import AuthenticateAlexaService from '@services/Alexa/AuthenticateAlexaService';
import buildAlexaResponse, {
  AlexaResponseProps,
} from '@utils/buildAlexaResponse';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AlexaController {
  public async index(request: Request, response: Response): Promise<Response> {
    const alexa_id = request?.body?.session?.user?.userId;
    const body = request?.body?.request as AlexaRequestDTO;
    const requestType = body?.type;
    const intent = body?.intent?.name;

    let alexaResponse: AlexaResponseProps = {
      speechText: 'Teste',
      shouldEndSession: false,
    };

    if (requestType === 'LaunchRequest') {
      console.log('LAUNCH');
    } else if (requestType === 'SessionEndedRequest') {
      console.log('SESSION ENDED');
    } else if (requestType === 'IntentRequest') {
      switch (intent) {
        case 'Authentication':
          const code = body?.intent?.slots?.code.value || '';
          const authenticateAlexa = container.resolve(AuthenticateAlexaService);

          const { user_id } = await authenticateAlexa.execute({
            code,
            alexa_id,
          });

          request.io.sockets.in(user_id).emit('Authenticated', {
            alexa_id,
            user_id: user_id,
          });

          alexaResponse = {
            speechText: 'Seu dispositivo foi autenticado',
            shouldEndSession: false,
          };
          break;
        case 'ListBeersWithFilters':
          const type = body?.intent?.slots?.type?.value || '';
          const brand = body?.intent?.slots?.brand?.value || '';

          break;
        default:
          console.log(request.body.request.intent.name);
          break;
      }
    }

    return response.json(buildAlexaResponse(alexaResponse));
  }
}
