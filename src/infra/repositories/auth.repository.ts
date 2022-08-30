import { Injectable } from '@nestjs/common';
import { AuthDTO } from '../controllers/auth/auth.dto';
import { AuthPresenter } from '../controllers/auth/auth.presenter';
import { IAuthRepository } from './../../domain/repositories/auth.repository';
import { IUserRepository } from './../../domain/repositories/user.repository';

@Injectable()
export class DatabaseAuthRepository implements IAuthRepository {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService,
  ) {}

  public async login(credentials: AuthDTO): Promise<AuthPresenter> {
    const userValidated: Omit<IUser, 'password'> = await this.validateUser(
      credentials.username,
      credentials.password,
    );

    return {
      accessToken: this.jwtService.sign({
        id: userValidated.id,
        username: userValidated.username,
        role: userValidated.role ? userValidated.role.permissions : '',
      }),
    };
  }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this.userRepository.findByKey('username', username);

    if (await checkHash(password, user.password)) {
      delete user.password;

      return user;
    }
  }
}
