import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from './items.schema';
import { Chat } from './chat.schema';
import axios from 'axios';

@Injectable()
export class ItemsService {
    constructor(@InjectModel(Item.name) private itemModel: Model<Item>,
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
    ) { }

    async create(item: Item): Promise<Item> {
        const newItem = new this.itemModel(item);
        return newItem.save();
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find().exec();
    }
    async handleChatGPT(userMessage: string): Promise<Chat> {
        const maxRetries = 3;
        let attempt = 0;
        let delay = 1000;
        while (attempt < maxRetries) {
            try {
                const response = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                        model: 'gpt-4',
                        messages: [{ role: 'user', content: userMessage }],
                        max_tokens: 1,
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${process.env.OPEN_AI}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                const botResponse = response.data.choices[0].message.content.trim();

                const chat = new this.chatModel({ userMessage, botResponse });
                await chat.save();
                return chat;

            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 429) {
                    attempt++;
                    console.log(`Attempt ${attempt} failed with 429. Retrying after ${delay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    delay *= 2;
                } else {
                    throw error;
                }
            }
        }

        throw new Error('Request failed after multiple retries');
    }



}



