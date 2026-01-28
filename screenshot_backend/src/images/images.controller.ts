// src/images/images.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  Get,
  Query,
  Res,
  BadRequestException,
} from "@nestjs/common";
import { ImagesService } from "./images.service";
import { UsersService } from "../users/users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import type { Request, Response } from "express";

@Controller("images")
export class ImagesController {
  constructor(
    private readonly imagesService: ImagesService,
    private readonly usersService: UsersService,
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file")) // Use FileInterceptor to handle file uploads
  async uploadImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let ipAddress = req.ip; // Get the IP address from the request
    if (ipAddress) {
      if (ipAddress.startsWith("::ffff:")) {
        ipAddress = ipAddress.substring(7); // Remove the IPv6 prefix
      }
    } else {
      throw new BadRequestException("IP address not found"); // Handle the case where IP is undefined
    }
    // Validate file input
    if (!file) {
      throw new BadRequestException("File is required"); // Throw an error if file is not provided
    }

    return this.imagesService.saveImage(ipAddress as string, file.buffer); // Pass the file buffer and IP address
  }

  @Get("user")
  async getImagesByUserAndTimeline(
    @Query("userId") userID: number,
    @Query("startedAt") startedAt: string,
    // @Query('endDate') endDate: string,
    @Res() res: Response,
  ) {
    const start = new Date(startedAt);
    // const end = new Date(endDate);
    const user = await this.usersService.findOneById(userID);
    if (!user) {
      return;
      // return res.json({ message: 'No users found' });
    }
    console.log(user);
    const images = await this.imagesService.getImagesByUsernameAndTimeline(
      user.username,
      start,
    );
    // const images = await this.imagesService.getImagesByUserIdAndTimeline(userID, start, end);
    // console.log(images);
    if (images.length === 0) {
      // return res.json({ message: 'No images found for this user in the specified timeline.' });
    }

    // Prepare to send back the image files

    const imageFiles = images.map((image) => {
      return {
        id: image.id,
        imagePath: image.imagePath, // Path to the image file
        username: image.username,
        ipAddress: image.ipAddress,
        createdAt: this.imagesService.formatDateAndTimeToString(
          image.createdAt,
        ),
      };
    });

    // Send the image files as a response
    res.json(imageFiles);
  }
}
