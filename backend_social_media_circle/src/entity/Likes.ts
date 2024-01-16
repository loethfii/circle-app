import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./User";
import { Threads } from "./Threads";
@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  threadId: number;

  @ManyToOne(() => Users, (user) => user.likes, { onDelete: "CASCADE" })
  user: Users;

  @ManyToOne(() => Threads, (thread) => thread.likes, { onDelete: "CASCADE" })
  thread: Threads;
}
