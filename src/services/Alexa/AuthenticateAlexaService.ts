import { inject, injectable } from 'tsyringe';

import IUserAlexaCodesRepository from '@repositories/UserAlexaCodesRepository/IUserAlexaCodesRepository';
import socket from '../../socket';

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

  public async execute({ code, alexa_id }: IRequest): Promise<void> {
    const userAlexaCode = await this.userAlexaCodesRepository.findByCode(code);

    if (userAlexaCode) {
      userAlexaCode.alexa_id = alexa_id;

      await this.userAlexaCodesRepository.save(userAlexaCode);

      socket.emit('Authenticated', {
        alexa_id,
        user_id: userAlexaCode.user_id,
      });
    }
  }
}

export default AuthenticateAlexaService;
