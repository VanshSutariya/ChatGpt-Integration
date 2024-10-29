import { Controller, Get, Post, Body } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.schema';
import { Chat } from './chat.schema';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Post()
    async create(@Body() item: Item) {
        return this.itemsService.create(item);
    }
    @Post('chat')
    async chatWithGPT(@Body('message') message: string): Promise<Chat> {
        return this.itemsService.handleChatGPT(message);
    }

    @Get()
    async findAll() {
        return this.itemsService.findAll();
    }
}
