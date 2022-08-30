import { DynamicModule, Module } from '@nestjs/common';
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  FindAllUserUseCase,
  FindOneUserUseCase,
  UpdateUserUseCase,
} from '../../../domain/use-cases/user/index';
import { UseCaseProxy } from '../usecase-proxy';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { LoggerModule } from '../../logger/logger.module';
import { LoggerService } from '../../logger/logger.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { DatabaseUserRepository } from '../../repositories/user.repository';

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
          inject: [DatabaseUserRepository],
          provide: AuthUsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (repository: DatabaseUserRepository) =>
            new UseCaseProxy(new FindOneUserUseCase(repository)),
        },
      ],
      exports: [AuthUsecasesProxyModule.LOGIN_USECASES_PROXY],
    };
  }
}
