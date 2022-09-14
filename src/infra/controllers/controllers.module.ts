import { Module } from '@nestjs/common';
import { AuthUsecasesProxyModule } from './../usecases-proxy/auth/auth-usecases-proxy.module';
import { UserUsecasesProxyModule } from '../usecases-proxy/user/user-usecases-proxy.module';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    UserUsecasesProxyModule.register(),
    AuthUsecasesProxyModule.register(),
  ],
  controllers: [UserController, AuthController],
})
export class ControllersModule {}
