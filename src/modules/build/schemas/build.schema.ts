import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BuildConf } from 'src/modules/build-conf/schemas/build-conf.schema';

@Schema({
  timestamps: {
    currentTime: (): number => Math.floor(Date.now() / 1000)
  },
})
export class Build extends Document {
  @Prop()
  repo: { repo: string, owner: string };

  @Prop()
  branch: string;

  @Prop()
  commit: string;

  @Prop()
  version: string;

  @Prop()
  message: string;

  @Prop()
  buildNumber: number;

  @Prop()
  buildConf: BuildConf;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const BuildSchema = SchemaFactory.createForClass(Build);
