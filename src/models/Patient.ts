import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("patient")
class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @PrimaryColumn()
  cpfcnpj: string;

  @PrimaryColumn()
  rg: string;

  @Column()
  birthday: Date;

  @Column()
  financialName: string;

  @Column()
  note: string;

  @Column()
  zipcode: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  address: string;

  @Column()
  addressNumber: string;

  @Column()
  complement: string;

  @Column()
  parentage01: string;

  @Column()
  name01: string;

  @Column()
  cpf01: string;

  @Column()
  rg01: string;

  @Column()
  mobile01: string;

  @Column()
  email01: string;

  @Column()
  birthday01: Date;

  @Column()
  parentage02: string;

  @Column()
  name02: string;

  @Column()
  cpf02: string;

  @Column()
  rg02: string;

  @Column()
  mobile02: string;

  @Column()
  email02: string;

  @Column()
  birthday02: Date;

  @Column()
  school: string;

  @Column()
  schoolGrade: string;

  @Column()
  schoolPhone: string;

  @Column()
  schoolEmail: string;

  @Column()
  schoolExpert: string;

  @Column()
  enable: boolean;

  @Column("simple-json")
  partner: {};

  @Column("simple-json")
  team: {};

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Patient;
