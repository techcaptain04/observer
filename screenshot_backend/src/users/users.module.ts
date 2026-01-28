// src/users/users.module.ts
import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "./user.entity"; // Import the User entity
import { ImagesModule } from "../images/images.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ImagesModule), // Import the TypeOrm module for the User entity
  ],
  controllers: [UsersController], // Register the UsersController
  providers: [UsersService], // Register the UsersService
  exports: [UsersService], // Export UsersService for use in other modules
})
export class UsersModule {}
