import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("denverCompetence")
export class DenverCompetence {
  @PrimaryColumn()
  id: number;

  @Column()
  level: string;

  @Column()
  domain: string;

  @Column()
  enable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
