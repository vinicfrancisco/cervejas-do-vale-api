import UserAlexaCode from '@models/UserAlexaCode';

export interface IGenerateCodeDTO {
  user_id: string;
  code: string;
}

export default interface IUserAlexaCodesRepository {
  findByCode(code: string): Promise<UserAlexaCode | undefined>;
  findByUserId(user_id: string): Promise<UserAlexaCode | undefined>;
  generateCode(data: IGenerateCodeDTO): Promise<UserAlexaCode>;
  save(userAlexaCode: UserAlexaCode): Promise<UserAlexaCode>;
}
