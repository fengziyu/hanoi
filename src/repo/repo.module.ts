import { Module } from '@nestjs/common';
import { RepoResolver } from './repo.resolver';
import { RepoService } from './repo.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Repo as RepoDocument, RepoSchema } from './schemas/repo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RepoDocument.name, schema: RepoSchema }]),
  ],
  providers: [RepoResolver, RepoService]
})
export class RepoModule {}
