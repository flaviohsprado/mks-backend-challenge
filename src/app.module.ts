import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { CustomHttpException } from './infra/common/filters/httpException.filter';
import { TransformResponseInterceptor } from './infra/common/interceptors/transformResponse.interceptor';
import { TypeOrmConfigModule } from './infra/config/typeorm/typeorm.module';
import { ControllersModule } from './infra/controllers/controllers.module';

@Module({
  imports: [ControllersModule, TypeOrmConfigModule],
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
  ],
})
export class AppModule {}
