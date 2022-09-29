import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CustomHttpException } from './infra/common/filters/httpException.filter';
import { TransformResponseInterceptor } from './infra/common/interceptors/transformResponse.interceptor';
import { ControllersModule } from './infra/controllers/controllers.module';
import { LoggerModule } from './infra/logger/logger.module';
import { LocalStrategy } from './infra/common/strategies/local.strategy';
import { JwtStrategy } from './infra/common/strategies/jwt.strategy';
import { UserUsecasesProxyModule } from './infra/usecases-proxy/user/user-usecases-proxy.module';
import { AuthUsecasesProxyModule } from './infra/usecases-proxy/auth/auth-usecases-proxy.module';
import { EnvironmentConfigModule } from './infra/config/environment-config/environment-config.module';
import { BcryptModule } from './infra/services/bcrypt/bcrypt.module';
import { JwtModule } from './infra/services/jwt/jwt.module';
import { ExceptionsModule } from './infra/exceptions/exceptions.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    LoggerModule,
    ExceptionsModule,
    JwtModule,
    BcryptModule,
    EnvironmentConfigModule,
    ControllersModule,
    UserUsecasesProxyModule.register(),
    AuthUsecasesProxyModule.register(),
  ],
  providers: [
    {
      provide: 'APP_FILTER',
      useClass: CustomHttpException,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: TransformResponseInterceptor,
    },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AppModule {}
