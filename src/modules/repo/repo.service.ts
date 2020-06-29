import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Repo as RepoDocument } from './schemas/repo.schema';
import { Model } from 'mongoose';
import { CreateRepoInput } from 'src/graphql.classes';

@Injectable()
export class RepoService {
  constructor(
    @InjectModel(RepoDocument.name)
    private repoModel: Model<RepoDocument>
  ) {}

  // 获取指定仓库
  async findOne(id: string): Promise<RepoDocument> {
    return this.repoModel.findOne({ _id: id, isDel: false }).exec();
  }

  // 获取所有仓库
  async findAll(): Promise<RepoDocument[]> {
    return this.repoModel.find({
      isDel: false
    }).exec();
  }

  // 创建仓库
  async create(createRepoInput: CreateRepoInput): Promise<RepoDocument> {
    const createRepo = new this.repoModel(createRepoInput);
    return createRepo.save();
  }

  // 删除仓库
  async remove(id: string): Promise<RepoDocument> {
    const repo = await this.repoModel.findOne({ _id: id });
    if (!repo) return null;
    repo.isDel = true;
    repo.save();
    return repo;
  }
}
