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

routes.post('/', (req: Request, res: Response) => {
  if (req.body.request.type === 'LaunchRequest') {
    console.log('LAUNCH');
  } else if (req.body.request.type === 'SessionEndedRequest') {
    console.log('SESSION ENDED');
  } else if (req.body.request.type === 'IntentRequest') {
    switch (req.body.request.intent.name) {
      case 'AMAZON.YesIntent':
        console.log('YES');
        break;
      case 'AMAZON.NoIntent':
        console.log('NO');
        break;
      case 'AMAZON.HelpIntent':
        console.log('HELP');
        break;
      case 'HelloWorldIntent':
        console.log(JSON.stringify(req.body.request));
        break;
      default:
        console.log(req.body.request.intent.name);
        break;
    }
  }

  return res.json(buildResponse('Teste', true, 'Teste'));
});

export default routes;
