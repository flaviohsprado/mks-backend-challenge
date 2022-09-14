import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';
import { IExceptionService } from '../../interfaces/exceptions.interface';

export class FindOneUserUseCase {
  constructor(
    private readonly repository: IUserRepository,
    private readonly exceptionService: IExceptionService,
  ) {}

  public async execute(id: string): Promise<User> {
    const user = this.repository.findOne(id);

    if (!user)
      this.exceptionService.throwNotFoundException({
        message: 'User not found',
      });

    return user;
  }
}
