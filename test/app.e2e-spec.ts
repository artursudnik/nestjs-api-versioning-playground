import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: ['1', '2'],
    });

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(404);
  });

  it('/v1/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/v1')
      .expect(200)
      .expect('version 1');
  });

  it('/v2/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/v2')
      .expect(200)
      .expect('version 2');
  });

  it('/v1/bye GET', function () {
    return request(app.getHttpServer())
      .get('/v1/bye')
      .expect(200)
      .expect('bye v1 and v2');
  });

  it('/v2/bye GET', function () {
    return request(app.getHttpServer())
      .get('/v2/bye')
      .expect(200)
      .expect('bye v1 and v2');
  });
});
