import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Users } from "./User";
@Entity()
export class Follows {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userFollowerId: number;

  @ManyToOne(() => Users, (user) => user.followers)
  userFollower: Users;

  @Column()
  userFollowedId: number;

  @ManyToOne(() => Users, (user) => user.followed, { onDelete: "CASCADE" })
  userFollowed: Users;
}
