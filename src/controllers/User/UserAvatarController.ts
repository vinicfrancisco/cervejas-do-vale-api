import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

import UpdateUserAvatarService from '@services/User/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const udpateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await udpateUserAvatar.execute({
      user_id: request.user.id,
      filename: request.file.filename,
    });

    return response.json(instanceToInstance(user));
  }
}
