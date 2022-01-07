import { AlexaRequestDTO } from '@dtos/alexa';
import UserAlexaCode from '@models/UserAlexaCode';
import AuthenticateAlexaService from '@services/Alexa/AuthenticateAlexaService';
import AppError from '@utils/AppError';
import buildAlexaResponse, {
  AlexaResponseProps,
} from '@utils/buildAlexaResponse';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { getRepository } from 'typeorm';

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
      alexaResponse = {
        speechText:
          'Bem-vindo à Cervejas do Vale. Diga seu código para continuar',
        shouldEndSession: false,
      };
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
          try {
            const type = body?.intent?.slots?.type?.value || '';
            const brand = body?.intent?.slots?.brand?.value || '';
            const userAlexaCodeRepository = getRepository(UserAlexaCode);

            const userAlexaCode = await userAlexaCodeRepository.findOne({
              where: { alexa_id },
            });

            if (!userAlexaCode) {
              throw new AppError('Usuário nào autenticado');
            }

            request.io.sockets.in(userAlexaCode.user_id).emit('ListBeers', {
              type,
              brand,
            });

            alexaResponse = {
              speechText: 'Aqui estão suas cervejas',
              shouldEndSession: false,
            };
          } catch {
            alexaResponse = {
              speechText: 'Você não está autenticado',
              shouldEndSession: true,
            };
          }
          break;
        default:
          console.log(request.body.request.intent.name);
          break;
      }
    }

    return response.json(buildAlexaResponse(alexaResponse));
  }
}
