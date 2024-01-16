import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./User";
import { Threads } from "./Threads";
@Entity()
export class Replies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  userId: number;

  @Column()
  threadId: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToOne(() => Users, (user) => user.replies, { onDelete: "CASCADE" })
  user: Users;

  @ManyToOne(() => Threads, (thread) => thread.replies, { onDelete: "CASCADE" })
  thread: Threads;
}
