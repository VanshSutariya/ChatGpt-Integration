import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb+srv://sutariyavansh:shzWxdeOVLzcdnwf@cluster0.pzu8eij.mongodb.net/gptIntegration', {
      connectionFactory: (connection) => {
        connection.once('open', () => {
          Logger.log('Database connected successfully!', 'MongoDB');
        });
        return connection;
      },
    }),
    ItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
