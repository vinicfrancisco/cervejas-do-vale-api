import User from '@models/User';
// import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
// import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
