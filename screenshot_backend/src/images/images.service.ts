// src/images/images.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan, Between } from 'typeorm';
import { Image } from './image.entity';
import { UsersService } from '../users/users.service'; // Import UsersService
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImagesService {
  private readonly imageDir = path.join(__dirname, '..', '..', 'upload'); // Directory to store images
  // private readonly hostUrl = `http://${process.env.ADMIN_IP}:${process.env.PORT}/upload`; //'http://172.20.1.22:5173/upload';

  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
    private usersService: UsersService // Inject UsersService
  ) {
    // Create the image directory if it doesn't exist
    console.log('imageDir: ', this.imageDir);
    if (!fs.existsSync(this.imageDir)) {
      fs.mkdirSync(this.imageDir);
    }
  }

  formatDateToString(date: Date) {
    const year = date.getFullYear(); // Get the full year (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (01-12)
    const day = String(date.getDate()).padStart(2, '0'); // Get the day (01-31)
    return `${year}-${month}-${day}`; // Format as 'YYYY-MM-DD'
  }

  formatDateAndTimeToString(date: Date) {
    const year = date.getFullYear(); // Get the full year (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (01-12)
    const day = String(date.getDate()).padStart(2, '0'); // Get the day (01-31)

    // Get hours, minutes, and seconds
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours (00-23)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes (00-59)
    const seconds = String(date.getSeconds()).padStart(2, '0'); // Get seconds (00-59)

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  async saveImage(ipAddress: string, imageBuffer: Buffer): Promise<Image> {
    // Find user by IP address
    const user = await this.usersService.findOneByIpAddress(ipAddress); // Implement this method in UsersService
    if (!user) {
      throw new NotFoundException('User not found'); // Handle user not found case
    }

    const date = new Date();
    const dateString = this.formatDateToString(date);
    console.log('date: ', date);

    // Ensure the user's directory exists
    const userDir = path.join(this.imageDir, dateString, user.username);
    console.log('userDir: ', userDir);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true }); // Create user directory if it doesn't exist
    }

    const imageName = `${Date.now()}.jpg`; // Generate a unique image name
    const imagePath = path.join(userDir, imageName); // Save path for the image
    console.log('imagePath: ', imagePath);
    // Save the image to the filesystem
    fs.writeFileSync(imagePath, imageBuffer);

    // const imageUrl = `${this.hostUrl}/${dateString}/${user.username}/${imageName}`;
    const imageUrl = `${dateString}/${user.username}/${imageName}`;

    // Create and save the image metadata
    const image = this.imagesRepository.create({
      username: user.username, // Use the username from the user object
      ipAddress: user.ipAddress, // Use the user's IP address
      imagePath: imageUrl // Store the path to the image
    });
    const value = this.imagesRepository.save(image);
    console.log('file save: ', value);
    return value;
  }

  //   async getImagesByUserIdAndTimeline(userId: number, startDate: Date, endDate: Date): Promise<Image[]> {
  async getImagesByUsernameAndTimeline(
    username: string,
    date: Date
  ): Promise<Image[]> {
    const startDate = new Date(date);
    startDate.setUTCHours(0, 0, 0, 0); // Set to 00:00:00

    const endDate = new Date(date);
    endDate.setUTCHours(23, 59, 59, 999);
    console.log(startDate, endDate);
    return this.imagesRepository.find({
      where: {
        username: username,
        createdAt: Between(startDate, endDate)
      }
    });
  }

  async countImagesToday(username: string): Promise<number> {
    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0); // Start of the day

    const endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999);
    console.log(startDate, endDate);
    return this.imagesRepository.count({
      where: {
        username: username,
        createdAt: Between(startDate, endDate)
      }
    });
    // return this.imagesRepository
    //   .count({
    //     where: {
    //       username,
    //       createdAt: MoreThanOrEqual(today), // Use MoreThanOrEqual for start of the day
    //     },
    //     // You can add another condition to ensure it's less than tomorrow
    //   })
    //   .then((count) => {
    //     return this.imagesRepository
    //       .count({
    //         where: {
    //           username,
    //           createdAt: LessThan(tomorrow), // Use LessThan for the end of the day
    //         },
    //       })
    //       .then((tomorrowCount) => count + tomorrowCount);
    //   });
  }
}
