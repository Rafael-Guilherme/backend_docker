import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity("expert")
class Expert {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @PrimaryColumn()
  cpfcnpj: string;

  @Column()
  email: string;

  @Column()
  mobile: string;

  @Column()
  specialty: string;

  @Column()
  enable: boolean;
}

export default Expert;
