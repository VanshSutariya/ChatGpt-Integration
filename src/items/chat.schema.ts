import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Chat extends Document {
    @Prop({ required: true })
    userMessage: string;

    @Prop({ required: true })
    botResponse: string;

    @Prop({ default: Date.now })
    timestamp: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
