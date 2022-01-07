import { inject, injectable } from 'tsyringe';

import IUserAlexaCodesRepository from '@repositories/UserAlexaCodesRepository/IUserAlexaCodesRepository';
import UserAlexaCode from '@models/UserAlexaCode';
import AppError from '@utils/AppError';

interface IRequest {
  code: string;
  alexa_id: string;
}

@injectable()
class AuthenticateAlexaService {
  constructor(
    @inject('UserAlexaCodesRepository')
    private userAlexaCodesRepository: IUserAlexaCodesRepository,
  ) {}

  public async execute({ code, alexa_id }: IRequest): Promise<UserAlexaCode> {
    const userAlexaCode = await this.userAlexaCodesRepository.findByCode(code);

    if (!userAlexaCode) {
      throw new AppError('User Alexa code not found');
    }

    userAlexaCode.alexa_id = alexa_id;

    await this.userAlexaCodesRepository.save(userAlexaCode);

    return userAlexaCode;
  }
}

export default AuthenticateAlexaService;
