import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Item, ItemSchema } from './items.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema } from './chat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }, { name: Chat.name, schema: ChatSchema }
  ])],
  providers: [ItemsService],
  controllers: [ItemsController]
})
export class ItemsModule { }
