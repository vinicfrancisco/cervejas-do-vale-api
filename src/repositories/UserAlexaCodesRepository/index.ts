import { getRepository, Repository } from 'typeorm';

import UserAlexaCode from '@models/UserAlexaCode';
import IUserAlexaCodesRepository, {
  IGenerateCodeDTO,
} from './IUserAlexaCodesRepository';

class UserAlexaCodesRepository implements IUserAlexaCodesRepository {
  private ormRepository: Repository<UserAlexaCode>;

  constructor() {
    this.ormRepository = getRepository(UserAlexaCode);
  }

  public async findByCode(code: string): Promise<UserAlexaCode | undefined> {
    const userAlexaCode = await this.ormRepository.findOne({
      where: { code },
    });

    return userAlexaCode;
  }

  public async findByUserId(
    user_id: string,
  ): Promise<UserAlexaCode | undefined> {
    const userAlexaCode = await this.ormRepository.findOne({
      where: { user_id },
    });

    return userAlexaCode;
  }

  public async generateCode({
    code,
    user_id,
  }: IGenerateCodeDTO): Promise<UserAlexaCode> {
    const userAlexaCode = this.ormRepository.create({ code, user_id });

    await this.ormRepository.save(userAlexaCode);

    return userAlexaCode;
  }

  public async save(userAlexaCode: UserAlexaCode): Promise<UserAlexaCode> {
    return this.ormRepository.save(userAlexaCode);
  }
}

export default UserAlexaCodesRepository;
