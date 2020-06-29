import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { RepoModule } from './repo/repo.module';
import { join } from 'path';
import { BuildModule } from './build/build.module';
import { BuildConfModule } from './build-conf/build-conf.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/hanoi'),
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.classes.ts'),
        outputAs: 'class',
      },
    }),
    RepoModule,
    BuildModule,
    BuildConfModule,
  ],
})
export class AppModule {}
