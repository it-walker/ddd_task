import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarModule } from './car/car.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'password',
    //   database: 'ddd',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: false,
    //   "logging": false,
    //   "migrations": [
    //     "src/migrations/**/*.ts"
    //   ],
    //   "subscribers": [
    //     "src/subscribers/**/*.ts"
    //   ],
    //   "cli": {
    //     "entitiesDir": "src/entities",
    //     "migrationsDir": "src/migrations",
    //     "subscribersDir": "src/subscribers"
    //   }
    // }),
    CarModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}