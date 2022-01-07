import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@config/auth';

import AppError from '@utils/AppError';

import User from '@models/User';
import IUsersRepository from '@repositories/UsersRepository/IUsersRepository';
import IHashProvider from '@providers/HashProvider/IHashProvider';
import IUserAlexaCodesRepository from '@repositories/UserAlexaCodesRepository/IUserAlexaCodesRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('UserAlexaCodesRepository')
    private userAlexaCodesRepository: IUserAlexaCodesRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password as string,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const findUserAlexaCode = await this.userAlexaCodesRepository.findByUserId(
      user.id,
    );

    const code = String(Math.floor(1000 + Math.random() * 9000));

    if (findUserAlexaCode) {
      findUserAlexaCode.code = code;

      await this.userAlexaCodesRepository.save(findUserAlexaCode);
    } else {
      await this.userAlexaCodesRepository.generateCode({
        user_id: user.id,
        code,
      });
    }

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
