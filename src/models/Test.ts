import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("test")
export class Test {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column()
  user_id: string;

  @Column()
  patient_id: string;

  @Column()
  type: "denver";

  @Column()
  finished: boolean;

  @Column()
  enable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
