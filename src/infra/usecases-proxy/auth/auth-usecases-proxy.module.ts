import { LoginUseCase } from './../../../domain/use-cases/auth/login.usecase';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from '../usecase-proxy';
import { EnvironmentConfigModule } from '../../config/environment-config/environment-config.module';
import { LoggerModule } from '../../logger/logger.module';
import { LoggerService } from '../../logger/logger.service';
import { RepositoriesModule } from '../../repositories/repositories.module';
import { DatabaseAuthRepository } from '../../repositories/auth.repository';

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
          inject: [LoggerService, DatabaseAuthRepository],
          provide: AuthUsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            repository: DatabaseAuthRepository,
          ) => new UseCaseProxy(new LoginUseCase(logger, repository)),
        },
      ],
      exports: [AuthUsecasesProxyModule.LOGIN_USECASES_PROXY],
    };
  }
}
