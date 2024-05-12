import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HomeModule } from './routes/home/home.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(HomeModule);

  const config = new DocumentBuilder()
    .setTitle('Full-Stack Turborepo API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  //CORS allow all
  app.enableCors();

  const port = process.env.PORT || 8000;
  await app.listen(port).then(() => {
    console.log(`Server started on port ${port}`);
    console.log(`Server started on http://localhost:${port}/`);
    console.log(`Swagger started on http://localhost:${port}/swagger`);
  });
}
bootstrap();
