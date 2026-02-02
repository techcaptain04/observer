// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ImagesModule } from './images/images.module';
import { User } from './users/user.entity';
import { Image } from './images/image.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'), // Adjust the path as necessary
      serveRoot: '/upload/' // This is the URL prefix
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // Your MySQL host
      port: 3306, // MySQL port
      username: 'root', // Your MySQL username
      password: '', // Your MySQL password
      database: 'observer', // Your MySQL database name
      entities: [User, Image], // Add your entities here
      synchronize: true // Set to false in production
      // migrations: ['dist/migration/*.{.ts,.js}'],
    }),
    TypeOrmModule.forFeature([User, Image]),
    AuthModule,
    UsersModule,
    ImagesModule
  ]
})
export class AppModule {}
