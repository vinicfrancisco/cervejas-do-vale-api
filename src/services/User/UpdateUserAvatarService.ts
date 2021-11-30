import { inject, injectable } from 'tsyringe';

import AppError from '@utils/AppError';

import User from '@models/User';
import IUsersRepository from '@repositories/UsersRepository/IUsersRepository';
import IStorageProvider from '@providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const avatarFilename = await this.storageProvider.savefile(filename);

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
