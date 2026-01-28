// src/users/users.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>, // Inject the User repository
  ) {}

  async findOne(username: string): Promise<User | null> {
    // Change to User | null
    return this.usersRepository.findOne({ where: { username } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findOneByIpAddress(ipAddress: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { ipAddress } });
  }

  async create(
    username: string,
    password: string,
    ipAddress: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      ipAddress,
    });
    return this.usersRepository.save(newUser); // Save to the database
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find(); // Fetch all users from the database
  }
}
