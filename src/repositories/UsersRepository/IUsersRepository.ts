import User from '@models/User';

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
