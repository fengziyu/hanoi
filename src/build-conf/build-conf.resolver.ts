import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BuildConf } from './schemas/build-conf.schema';
import { BuildConfService } from './build-conf.service';
import { CreateBuildConfDto } from './dto/createBuildConf.dto';

@Resolver('BuildConf')
export class BuildConfResolver {
  constructor(
    private buildConfService: BuildConfService
  ) {}

  @Query()
  buildConf(@Args('_id') id: string): Promise<BuildConf> {
    return this.buildConfService.findOne(id);
  }

  @Query()
  buildConfs(@Args('repoId') repoId: string): Promise<BuildConf[]> {
    return this.buildConfService.findAll(repoId);
  }

  @Mutation()
  createBuildConf(@Args('createBuildConfInput') createBuildConfInput: CreateBuildConfDto): Promise<BuildConf> {
    return this.buildConfService.create(createBuildConfInput);
  }
  
}
