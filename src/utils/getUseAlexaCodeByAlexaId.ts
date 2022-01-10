import UserAlexaCode from '@models/UserAlexaCode';
import { getRepository } from 'typeorm';
import AppError from './AppError';

async function getUseAlexaCodeByAlexaId(
  alexa_id: string,
): Promise<UserAlexaCode> {
  const userAlexaCodeRepository = getRepository(UserAlexaCode);

  const userAlexaCode = await userAlexaCodeRepository.findOne({
    where: { alexa_id },
  });

  if (!userAlexaCode) {
    throw new AppError('Usuário nào autenticado');
  }

  return userAlexaCode;
}

export default getUseAlexaCodeByAlexaId;
