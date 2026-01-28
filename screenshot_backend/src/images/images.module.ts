// src/images/images.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImagesService } from "./images.service";
import { ImagesController } from "./images.controller";
import { Image } from "./image.entity"; // Assuming you have an Image entity
import { UsersModule } from "../users/users.module"; // Import UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]), // Import the TypeOrm module for the Image entity
    forwardRef(() => UsersModule), // Import UsersModule to access UsersService
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
