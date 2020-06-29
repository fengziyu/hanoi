import { Module } from '@nestjs/common';
import { BuildConfService } from './build-conf.service';
import { BuildConfResolver } from './build-conf.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BuildConf, BuildConfSchema } from './schemas/build-conf.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BuildConf.name, schema: BuildConfSchema }])
  ],
  providers: [BuildConfService, BuildConfResolver],
  exports: [BuildConfService]
})
export class BuildConfModule {}
