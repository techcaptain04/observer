// src/users/users.controller.ts
import {
  Controller,
  Get,
  Req,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { ImagesService } from "../images/images.service";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly imagesService: ImagesService,
  ) {}

  @Get()
  async getUsers(@Req() req) {
    let ipAddress = this.normalizeIp(req.ip);

    // Check if the request comes from the admin IP
    if (ipAddress === process.env.ADMIN_IP) {
      return await this.getAllUsersWithImageCounts();
    } else {
      return await this.getUserByIpAddress(ipAddress);
    }
  }

  private normalizeIp(ip: string): string {
    if (!ip) {
      throw new BadRequestException("IP address not found"); // Handle the case where IP is undefined
    }
    return ip.startsWith("::ffff:") ? ip.substring(7) : ip; // Remove the IPv6 prefix if present
  }

  private async getAllUsersWithImageCounts() {
    const users = await this.usersService.findAll(); // Call the service method to get all users
    const counts = await Promise.all(
      users.map(async (user) => {
        const count = await this.imagesService.countImagesToday(user.username);
        return {
          id: user.id,
          username: user.username,
          count,
          ipAddress: user.ipAddress,
        };
      }),
    );
    return counts; // Return the counts for all users
  }

  private async getUserByIpAddress(ipAddress: string) {
    const user = await this.usersService.findOneByIpAddress(ipAddress);
    if (!user) {
      throw new NotFoundException("User not found"); // Handle user not found case
    }
    const foundUser = await this.usersService.findOne(user.username);
    return foundUser ? [foundUser] : []; // Return the found user or an empty array
  }
}
