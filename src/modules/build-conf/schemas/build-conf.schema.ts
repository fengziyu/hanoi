import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: {
    currentTime: (): number => Math.floor(Date.now() / 1000)
  },
})
export class BuildConf extends Document {
  @Prop()
  repoId: string;

  @Prop()
  confName: string;

  @Prop()
  deployDir: string;

  @Prop()
  buildCmd: string;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const BuildConfSchema = SchemaFactory.createForClass(BuildConf);


