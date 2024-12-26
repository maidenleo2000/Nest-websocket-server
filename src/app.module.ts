import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [

    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({

      //configuracion para HEROKU
      ssl: process.env.STAGE === 'prod' ? true : false,
      extra: {
        ssl: process.env.STAGE === 'prod' 
      ? {rejectUnauthorized: false}
      : null,
      },
      //Fin de configuracion para HEROKU
      

      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //cuando hay algun cambio en la base de datos, se actualiza la base de datos. En produccion esto no se debe hacer
    }),

    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),

    ProductsModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    MessagesWsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
