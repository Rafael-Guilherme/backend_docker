import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity("patient")
class Patient {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @PrimaryColumn()
  cpfcnpj: string;

  @Column()
  rg: string;

  @Column()
  birthday: string;

  @Column()
  name01: string;

  @Column()
  mobile01: string;

  @Column()
  name02: string;

  @Column()
  mobile02: string;

  @Column()
  enable: boolean;
}

export default Patient;
