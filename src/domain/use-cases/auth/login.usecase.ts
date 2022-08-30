import { AuthPresenter } from './../../../infra/controllers/auth/auth.presenter';
import { AuthDTO } from './../../../infra/controllers/auth/auth.dto';
import { IAuthRepository } from './../../repositories/auth.repository';
import { ILogger } from './../../logger/logger.interface';

export class LoginUseCase {
  constructor(
    private readonly logger: ILogger,
    private readonly repository: IAuthRepository,
  ) {}

  public async execute(credentials: AuthDTO): Promise<AuthPresenter> {
    const user = await this.repository.login(credentials);

    this.logger.log(`LoginUseCases execute()`, `User have been logged in`);

    return new AuthPresenter(user);
  }
}
