import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupContainerFor } from './infra/common/utils/setupContainerFor.setup';
import { SetupInterceptor } from './infra/common/utils/setupInterceptorFor.setup';
import { SetupPipeFor } from './infra/common/utils/setupPipeFor.setup';
import { SetupRoute } from './infra/common/utils/setupRouteFor.setup';
import { SetupSwagger } from './infra/common/utils/setupSwaggerFor.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SetupSwagger.for(app);

  SetupInterceptor.for(app);

  SetupRoute.for(app);

  SetupPipeFor.for(app);

  SetupContainerFor.for(app, AppModule);

  await app.listen(3000);
}

bootstrap();
