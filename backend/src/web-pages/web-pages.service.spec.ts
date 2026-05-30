import { Test, TestingModule } from '@nestjs/testing';
import { WebPagesService } from './web-pages.service';

describe('WebPagesService', () => {
  let service: WebPagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebPagesService],
    }).compile();

    service = module.get<WebPagesService>(WebPagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
