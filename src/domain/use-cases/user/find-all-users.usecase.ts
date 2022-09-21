import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user.repository';

export class FindAllUserUseCase {
  constructor(private readonly repository: IUserRepository) {}

  public async execute(): Promise<User[]> {
    return this.repository.findAll();
  }
}
