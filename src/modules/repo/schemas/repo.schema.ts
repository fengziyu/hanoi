import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: {
    currentTime: (): number => Math.floor(Date.now() / 1000)
  },
})
export class Repo extends Document {
  @Prop()
  name: string;

  @Prop()
  repo: string;

  @Prop()
  owner: string;

  @Prop({
    default: false,
  })
  isDel: boolean;

  @Prop()
  createdAt: number;

  @Prop()
  updatedAt: number;
}

export const RepoSchema = SchemaFactory.createForClass(Repo);
