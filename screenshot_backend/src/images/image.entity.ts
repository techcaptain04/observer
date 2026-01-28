// src/images/image.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  ipAddress: string;

  @Column()
  imagePath: string; // Path to the stored image

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp of when the image was uploaded
}
