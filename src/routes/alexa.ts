import AlexaController from '@controllers/Alexa/AlexaController';
import { Router } from 'express';

const routes = Router();
const alexaController = new AlexaController();

routes.post('/', alexaController.index);

export default routes;
