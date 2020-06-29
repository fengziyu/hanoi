import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Build as BuildDocument } from './schemas/build.schema';
import { Model } from 'mongoose';

@Injectable()
export class BuildService {
  constructor(
    @InjectModel(BuildDocument.name)
    private buildModel: Model<BuildDocument>
  ) {}

  find(id: string): Promise<BuildDocument> {
    return this.buildModel.findOne({ _id: id }).exec();
  }

  findAll(repoId: string): Promise<BuildDocument[]> {
    return this.buildModel.find({ repoId }).exec();
  }

  async create(createBuildInput: BuildDocument): Promise<BuildDocument> {
    const createRepo = new this.buildModel(createBuildInput);
    return createRepo.save();
  }
}
