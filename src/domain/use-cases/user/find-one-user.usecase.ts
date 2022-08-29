import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

export class FindOneUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  public async execute(id: string): Promise<User> {
    return this.repository.findOne(id);
  }
}