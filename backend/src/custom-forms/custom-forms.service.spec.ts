import { Test, TestingModule } from '@nestjs/testing';
import { CustomFormsService } from './custom-forms.service';

describe('CustomFormsService', () => {
  let service: CustomFormsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomFormsService],
    }).compile();

    service = module.get<CustomFormsService>(CustomFormsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
