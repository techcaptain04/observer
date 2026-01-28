// src/auth/auth.controller.ts
import { Controller, Post, Body, Request, BadRequestException, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto'; // Import the User DTO
import { LoginUserDto } from './login-user.dto'; // Import the Login DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: LoginUserDto, @Response() res) { // Use the LoginUserDto
    console.log("Auth user: ", userLoginDto); // Log the received user data
    if (!userLoginDto) {
      console.error("userLoginDto is undefined");
      throw new Error("userLoginDto is undefined");
    }
    const result = await this.authService.login(userLoginDto);
    console.log("hello", result.message)
    if (result.message === "success") {
        return res.json(result);
    } else if (result.message === "Invalid username or password") {
        return res.status(401).json(result);
    } else if (result.message === "Username and password are required") {
        return res.status(500).json(result);
    }
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto, @Request() req, @Response() res) {
    let ipAddress = req.ip;
    if (ipAddress) {
        if (ipAddress.startsWith('::ffff:')) {
        ipAddress = ipAddress.substring(7); // Remove the IPv6 prefix
        }
    } else {
        throw new BadRequestException('IP address not found'); // Handle the case where IP is undefined
    }
    console.log(createUserDto.username, createUserDto.password);
    if (!createUserDto.username || !createUserDto.password) {
        console.log("hello");
        return res.status(401).json({message: "Username or Password is required"})
    }
    const user = await this.authService.signup(createUserDto, ipAddress);
    console.log(user);
    if (user === null) {
        return res.status(404).json({message: "already exists"});
    } else {
        return res.json({message: "success"});
    }
  }
}
