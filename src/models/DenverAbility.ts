import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { TestAnswer } from "./TestAnswer";

@Entity("denverAbility")
export class DenverAbility {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  denverCompetence_id: number;

  @OneToMany(() => TestAnswer, (answer) => answer.denverAbility)
  @JoinColumn({ name: "denverAbility_id" })
  answers: TestAnswer[];

  @Column()
  enable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
