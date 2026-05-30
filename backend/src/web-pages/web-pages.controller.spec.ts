import { Test, TestingModule } from '@nestjs/testing';
import { WebPagesController } from './web-pages.controller';
import { WebPagesService } from './web-pages.service';

describe('WebPagesController', () => {
  let controller: WebPagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebPagesController],
      providers: [WebPagesService],
    }).compile();

    controller = module.get<WebPagesController>(WebPagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
