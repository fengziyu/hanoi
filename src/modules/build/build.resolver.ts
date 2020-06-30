import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { BuildService } from './build.service';
import { Build as BuildDocument } from './schemas/build.schema';
import { CreateBuildDto } from './dto/createBuild.dto';
import { BuildConfService } from 'src/modules/build-conf/build-conf.service';
import { UserInputError, HttpQueryError } from 'apollo-server-core';
import { DroneService } from '../drone/drone.service';
import { CancelBuildDto } from './dto/CancelBuild.dto';

@Resolver('Build')
export class BuildResolver {
  constructor(
    private buildService: BuildService,
    private buildConfService: BuildConfService,
    private droneService: DroneService,
  ) {}

  @Query()
  build(@Args('_id') id: string): Promise<BuildDocument> {
    return this.buildService.find(id);
  }
  
  @Query()
  builds(@Args('repoId') repoId: string): Promise<BuildDocument[]> {
    return this.buildService.findAll(repoId);
  }

  /** 构建 */
  @Mutation()
  async createBuild(@Args('createBuildInput') createBuildInput: CreateBuildDto): Promise<BuildDocument> {
    const { buildConfId, owner, repo, ...buildInfo } = createBuildInput;
    const buildConf = await this.buildConfService.findOne(buildConfId);
    if (!buildConf) throw new UserInputError('构建配置不存在');
    try {
      const droneBuild = await this.droneService.trigger({
        owner,
        repo,
      })
      const { number } = droneBuild;
      return await this.buildService.create(({
        repo: { owner, repo },
        ...buildInfo,
        buildNumber: number,
        buildConf,
      } as BuildDocument))
    } catch (error) {
      console.log(error);
      throw new HttpQueryError(error.code, error.errno);
    }
  }

  /** 取消构建 */
  @Mutation('cancelBuild')
  async cancelBuild(@Args('cancelBuildInput') cancelBuildInput: CancelBuildDto): Promise<any> {
    try {
      await this.droneService.cancelBuild({
        owner: cancelBuildInput.owner,
        repo: cancelBuildInput.repo,
        build: cancelBuildInput.buildNumber
      })
      return true;
    } catch (error) {
      return false;
    }
  }
}
