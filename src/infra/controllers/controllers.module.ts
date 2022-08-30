import { Module } from '@nestjs/common';
import { UserUsecasesProxyModule } from '../usecases-proxy/user/user-usecases-proxy.module';

import { UserController } from './user/user.controller';

@Module({
  imports: [UserUsecasesProxyModule.register()],
  controllers: [UserController],
})
export class ControllersModule {}
