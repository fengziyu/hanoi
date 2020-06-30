import { Module } from '@nestjs/common';
import { BuildService } from './build.service';
import { BuildResolver } from './build.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Build, BuildSchema } from './schemas/build.schema';
import { BuildConfModule } from 'src/modules/build-conf/build-conf.module';
import { DroneModule } from '../drone/drone.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Build.name, schema: BuildSchema }]),
    BuildConfModule,
    DroneModule
  ],
  providers: [BuildService, BuildResolver]
})
export class BuildModule {}
