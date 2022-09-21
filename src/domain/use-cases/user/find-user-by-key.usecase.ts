import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { IExceptionService } from '../../interfaces/exceptions.interface';

export class FindUserByKeyUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly exceptionService: IExceptionService,
  ) {}

  public async execute(key: string, value: string): Promise<User> {
    const user: User = await this.repository.findByKey(key, value);

    if (!user)
      this.exceptionService.throwNotFoundException({
        message: 'User not found',
      });

    return user;
  }
}
