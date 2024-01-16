import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Users } from "./User";
import { Replies } from "./Replies";
import { Likes } from "./Likes";

@Entity()
export class Threads {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  posted_at: Date;

  @Column()
  userId: number;

  @ManyToOne(() => Users, (users) => users.threads, { onDelete: "CASCADE" })
  user: Users;

  @OneToMany(() => Replies, (replies) => replies.thread, {
    onDelete: "CASCADE",
  })
  replies: Replies[];

  @OneToMany(() => Likes, (likes) => likes.thread, { onDelete: "CASCADE" })
  likes: Likes[];
}
