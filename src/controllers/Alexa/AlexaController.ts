import { AlexaRequestDTO } from '@dtos/alexa';
import AuthenticateAlexaService from '@services/Alexa/AuthenticateAlexaService';
import buildAlexaResponse, {
  AlexaResponseProps,
} from '@utils/buildAlexaResponse';
import getUseAlexaCodeByAlexaId from '@utils/getUseAlexaCodeByAlexaId';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class AlexaController {
  public async index(request: Request, response: Response): Promise<Response> {
    const alexa_id = request?.body?.session?.user?.userId;
    const body = request?.body?.request as AlexaRequestDTO;
    const requestType = body?.type;
    const intent = body?.intent?.name;

    let alexaResponse: AlexaResponseProps = {
      speechText: '',
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
            speechText:
              'Seu dispositivo foi autenticado. Você já pode realizar consultas',
            shouldEndSession: false,
          };
          break;
        case 'ListBeersWithFilters':
          {
            try {
              const type = body?.intent?.slots?.type?.value || '';
              const brand = body?.intent?.slots?.brand?.value || '';
              const { user_id } = await getUseAlexaCodeByAlexaId(alexa_id);

              request.io.sockets.in(user_id).emit('ListBeers', {
                type,
                brand,
              });

              alexaResponse = {
                speechText: 'Aqui estão os resultados da sua pesquisa',
                shouldEndSession: false,
              };
            } catch {
              alexaResponse = {
                speechText:
                  'Você não está autenticado. Siga as instruções no aplicativo para se autenticar',
                shouldEndSession: true,
              };
            }
          }
          break;
        case 'ListFavoriteBeers': {
          try {
            const { user_id } = await getUseAlexaCodeByAlexaId(alexa_id);

            request.io.sockets.in(user_id).emit('ListFavoriteBeers');

            alexaResponse = {
              speechText: 'Aqui estão suas cervejas favoritas',
              shouldEndSession: false,
            };
          } catch {
            alexaResponse = {
              speechText:
                'Você não está autenticado. Siga as instruções no aplicativo para se autenticar',
              shouldEndSession: true,
            };
          }

          break;
        }
        case 'ListBestBeers':
          try {
            const { user_id } = await getUseAlexaCodeByAlexaId(alexa_id);

            request.io.sockets.in(user_id).emit('ListBeers', {
              sort: 'rating',
            });

            alexaResponse = {
              speechText: 'Aqui estão suas cervejas favoritas',
              shouldEndSession: false,
            };
          } catch {
            alexaResponse = {
              speechText:
                'Você não está autenticado. Siga as instruções no aplicativo para se autenticar',
              shouldEndSession: true,
            };
          }
          break;
        case 'ListWorstBeers':
          try {
            const { user_id } = await getUseAlexaCodeByAlexaId(alexa_id);

            request.io.sockets.in(user_id).emit('ListBeers', {
              sort: '-rating',
            });

            alexaResponse = {
              speechText: 'Aqui estão suas cervejas favoritas',
              shouldEndSession: false,
            };
          } catch {
            alexaResponse = {
              speechText:
                'Você não está autenticado. Siga as instruções no aplicativo para se autenticar',
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
