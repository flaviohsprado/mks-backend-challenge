import { AuthPresenter } from './../../infra/controllers/auth/auth.presenter';
import { AuthDTO } from './../../infra/controllers/auth/auth.dto';

export interface IAuthRepository {
  login(credentials: AuthDTO): Promise<AuthPresenter>;
}
