import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BuildConf as BuildConfDocument } from './schemas/build-conf.schema';
import { Model } from 'mongoose';
import { CreateBuildConfDto } from './dto/createBuildConf.dto';

@Injectable()
export class BuildConfService {
  constructor(
    @InjectModel(BuildConfDocument.name)
    private buildConfModel: Model<BuildConfDocument>
  ) {}

  findOne(id: string): Promise<BuildConfDocument> {
    return this.buildConfModel.findOne({ _id: id }).exec();
  }

  findAll(repoId: string): Promise<BuildConfDocument[]> {
    return this.buildConfModel.find({ repoId }).exec();
  }

  /** 添加构建配置 */
  async create(createBuildConfInput: CreateBuildConfDto): Promise<BuildConfDocument> {
    const createRepo = new this.buildConfModel(createBuildConfInput);
    return createRepo.save();
  }

}
