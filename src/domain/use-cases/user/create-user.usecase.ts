import { CreateUserDTO } from './../../../infra/controllers/user/user.dto';
import { User } from './../../entities/user.entity';
import { ILogger } from './../../logger/logger.interface';
import { UserRepository } from './../../repositories/user.repository';

export class CreateUserUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly repository: UserRepository,
  ) {}

  public async execute(user: CreateUserDTO): Promise<User> {
    const createdUser = await this.repository.create(user);

    this.logger.log(
      'CreateUserUseCases execute()',
      'New user have been inserted',
    );

    return createdUser;
  }
}
