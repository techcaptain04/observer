// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './create-user.dto'; // Import the DTO
import { LoginUserDto } from './login-user.dto'; // Import the DTO
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // Inject JwtService here
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log("Validate user: ", user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userLoginDto: LoginUserDto) {
    const { username, password } = userLoginDto;
    console.log("Logging in user:", username); // Log the username for debugging

    // Perform your authentication logic here
    if (!username || !password) {
      console.log("Username and password are required");
      return { message: "Username and password are required"}
      throw new Error('Username and password are required');
    }

    // Await the result of validateUser
    const user = await this.validateUser(username, password);
    if (user) {
      // User is valid, generate the access token
      return {
        message: "success",
        access_token: this.jwtService.sign({ username }), // Use injected jwtService
      };
    }
    
    // If validation fails, return null or throw an error
    console.log("Invalid username or password");
    return { message: "Invalid username or password" }
    throw new Error('Invalid username or password');
  }

  async signup(createUserDto: CreateUserDto, ipAddress: string) {
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
        // console.log(existingUser);
        return null;
      throw new Error('User already exists'); // Handle error appropriately
    } else {
        return this.usersService.create(createUserDto.username, createUserDto.password, ipAddress);
    }
  }
}
