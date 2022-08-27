import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

export class FindAllUserUseCase {
  constructor(private readonly repository: UserRepository) {}

  public async execute(): Promise<User[]> {
    return this.repository.findAll();
  }
}
