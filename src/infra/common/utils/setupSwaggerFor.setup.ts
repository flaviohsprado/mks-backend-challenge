import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SetupSwagger {
  static for(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('MKS Backend Challenge API')
      .setDescription(
        'This is a sample API with user and authentication modules and that calls another 3rd party API that returns a list of movies',
      )
      .setVersion('1.0')
      .addTag('User')
      .addTag('Authentication')
      .addTag('Movie')
      .addBearerAuth()
      .addBasicAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
