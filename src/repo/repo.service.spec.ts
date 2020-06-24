import { Test, TestingModule } from '@nestjs/testing';
import { RepoService } from './repo.service';
import { getModelToken } from '@nestjs/mongoose';
import { RepoSchema } from './schemas/repo.schema';


describe('RepoService', () => {
  let service: RepoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RepoService,
        {
          provide: getModelToken('Repo'),
          useValue: RepoSchema,
        },
      ],
    }).compile();

    service = module.get<RepoService>(RepoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
