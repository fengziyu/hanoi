import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BuildService } from './build.service';
import { Build as BuildDocument } from './schemas/build.schema';
import { CreateBuildDto } from './dto/createBuild.dto';
import { BuildConfService } from 'src/build-conf/build-conf.service';
import { UserInputError } from 'apollo-server-core';

@Resolver('Build')
export class BuildResolver {
  constructor(
    private buildService: BuildService,
    private buildConfService: BuildConfService,
  ) {}

  @Query()
  build(@Args('_id') id: string): Promise<BuildDocument> {
    return this.buildService.find(id);
  }
  
  @Query()
  builds(@Args('repoId') repoId: string): Promise<BuildDocument[]> {
    return this.buildService.findAll(repoId);
  }

  @Mutation()
  async createBuild(@Args('createBuildInput') createBuildInput: CreateBuildDto): Promise<BuildDocument> {
    console.log('createBuildInput :>> ', createBuildInput);
    const buildConf = await this.buildConfService.findOne(createBuildInput.buildConfId);
    if (!buildConf) throw new UserInputError('构建配置不存在');
    return this.buildService.create(({
      repoId: createBuildInput.repoId,
      branch: createBuildInput.branch,
      commit: createBuildInput.commit,
      version: createBuildInput.version,
      status: createBuildInput.status,
      message: createBuildInput.message,
      buildConf,
    } as BuildDocument))
  }
}
