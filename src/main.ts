import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupInterceptor } from './infra/common/utils/setupInterceptorFor.setup';
import { SetupRoute } from './infra/common/utils/setupRouteFor.setup';
import { SetupSwagger } from './infra/common/utils/setupSwaggerFor.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SetupSwagger.for(app);

  SetupInterceptor.for(app);

  SetupRoute.for(app);

  await app.listen(3000);
}
bootstrap();
