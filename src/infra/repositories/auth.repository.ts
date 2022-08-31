import { Injectable } from '@nestjs/common';
import { AuthDTO } from '../controllers/auth/auth.dto';
import { AuthPresenter } from '../controllers/auth/auth.presenter';
import { IAuthRepository } from './../../domain/repositories/auth.repository';
import { IUserRepository } from './../../domain/repositories/user.repository';
import { User } from './../../domain/entities/user.entity';
import { IBcryptService } from './../../domain/interfaces/bcrypt.interface';
import { IJwtService } from './../../domain/interfaces/jwt.interface';

@Injectable()
export class DatabaseAuthRepository implements IAuthRepository {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService,
    private readonly bcryptService: IBcryptService,
  ) {}

  public async login(credentials: AuthDTO): Promise<AuthPresenter> {
    const userValidated: Omit<User, 'password'> = await this.validateUser(
      credentials.username,
      credentials.password,
    );

    return {
      accessToken: this.jwtService.createToken({
        id: userValidated.id,
        username: userValidated.username,
      }),
    };
  }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findByKey('username', username);

    if (await this.bcryptService.checkHash(password, user.password)) {
      delete user.password;

      return user;
    }
  }
}
