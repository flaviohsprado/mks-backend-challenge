import { LoginUseCase } from './../../../domain/use-cases/auth/login.usecase';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from '../usecase-proxy';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { LoggerModule } from '../../logger/logger.module';
import { LoggerService } from '../../logger/logger.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { DatabaseAuthRepository } from '../../repositories/auth.repository';
import { IUserRepository } from '../../repositories/user.repository';
import { IBcryptService } from '../../interfaces/bcrypt.interface';
import { IJwtService } from '../../interfaces/jwt.interface';

@Module({
  imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule],
})
export class AuthUsecasesProxyModule {
  static LOGIN_USECASES_PROXY = 'loginUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: AuthUsecasesProxyModule,
      providers: [
        {
          inject: [
            LoggerService,
            DatabaseAuthRepository,
            userRepository,
            jwtService,
            bcryptService,
          ],
          provide: AuthUsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            repository: DatabaseAuthRepository,
            userRepository: IUserRepository,
            jwtService: IJwtService,
            bcryptService: IBcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUseCase(
                logger,
                new repository(userRepository, jwtService, bcryptService),
              ),
            ),
        },
      ],
      exports: [AuthUsecasesProxyModule.LOGIN_USECASES_PROXY],
    };
  }
}
