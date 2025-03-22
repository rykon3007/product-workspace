// src/domain/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  githubPatEncrypted!: string;

  @Column()
  openaiKeyEncrypted!: string;

  @Column()
  claudeKeyEncrypted!: string;

  @Column()
  localLLMUrl!: string;
}
