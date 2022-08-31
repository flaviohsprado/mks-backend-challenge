import { AuthUsecasesProxyModule } from './../usecases-proxy/auth/auth-usecases-proxy.module';
import { Module } from '@nestjs/common';
import { UserUsecasesProxyModule } from '../usecases-proxy/user/user-usecases-proxy.module';

import { UserController } from './user/user.controller';

@Module({
  imports: [
    UserUsecasesProxyModule.register(),
    AuthUsecasesProxyModule.register(),
  ],
  controllers: [UserController, AuthController],
})
export class ControllersModule {}
