import { Test, TestingModule } from '@nestjs/testing';
import { CustomFormsController } from './custom-forms.controller';
import { CustomFormsService } from './custom-forms.service';

describe('CustomFormsController', () => {
  let controller: CustomFormsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomFormsController],
      providers: [CustomFormsService],
    }).compile();

    controller = module.get<CustomFormsController>(CustomFormsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
