import { Test, TestingModule } from '@nestjs/testing';
import { BuildConfService } from './build-conf.service';

describe('BuildConfService', () => {
  let service: BuildConfService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildConfService],
    }).compile();

    service = module.get<BuildConfService>(BuildConfService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
