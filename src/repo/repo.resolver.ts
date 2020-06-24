import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { RepoService } from './repo.service';
import { Repo as RepoDocument } from './schemas/repo.schema';
import { CreateRepoInput } from 'src/graphql.classes';
import { UserInputError } from 'apollo-server-core';

@Resolver('Repo')
export class RepoResolver {
  constructor(
    private repoService: RepoService
  ) {}

  @Query('repo')
  async repo(@Args('_id') id: string): Promise<RepoDocument> {
    return await this.repoService.findOne(id);
  }

  @Query('repos')
  async repos(): Promise<RepoDocument[]> {
    return this.repoService.findAll();
  }

  @Mutation('createRepo')
  async createRepo(@Args('createRepoInput') createRepoInput: CreateRepoInput): Promise<RepoDocument> {
    return this.repoService.create(createRepoInput);
  }

  @Mutation('removeRepo')
  async removeRepo(@Args('_id') id: string): Promise<RepoDocument> {
    const repo = await this.repoService.remove(id);
    if (!repo) throw new UserInputError('该仓库不存在');
    return this.repoService.remove(id);
  }
}
