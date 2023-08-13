import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("expert")
export default class Expert {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @PrimaryColumn()
  cpfcnpj: string;

  @Column()
  rg: string;

  @Column()
  mobile: string;

  @Column()
  email: string;

  @Column()
  specialty: string;

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
  birthday: Date;

  @Column()
  bank: string;

  @Column()
  branch: string;

  @Column()
  account: string;

  @Column()
  pixKey: string;

  @Column()
  enable: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
