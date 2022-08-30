import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';

export class FindOneUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(id: string): Promise<User> {
    return this.repository.findOne(id);
  }
}
