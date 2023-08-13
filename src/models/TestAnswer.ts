import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DenverAbility } from "./DenverAbility";

@Entity("testAnswer")
export class TestAnswer {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  test_id: number;

  @Column()
  denverAbility_id: number;

  @ManyToOne(() => DenverAbility, (ability) => ability.answers)
  @JoinColumn({ name: "denverAbility_id" })
  denverAbility: DenverAbility;

  @Column()
  answer: 0 | 1 | 2 | 3;

  @Column()
  intervention: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
