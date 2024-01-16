import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Threads } from "./Threads";
import { Replies } from "./Replies";
import { Likes } from "./Likes";
import { Follows } from "./Follows";
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  username: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @OneToMany(() => Threads, (thread) => thread.user, { onDelete: "CASCADE" })
  threads: Threads[];

  @OneToMany(() => Replies, (reply) => reply.user, { onDelete: "CASCADE" })
  replies: Replies[];

  @OneToMany(() => Likes, (like) => like.user, { onDelete: "CASCADE" })
  likes: Likes[];

  @OneToMany(() => Follows, (follower) => follower.userFollower, {
    onDelete: "CASCADE",
  })
  followed: Follows[];

  @OneToMany(() => Follows, (followed) => followed.userFollowed, {
    onDelete: "CASCADE",
  })
  followers: Follows[];
}
