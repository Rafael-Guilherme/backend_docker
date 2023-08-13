import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('bank')
export class Bank {
  @PrimaryColumn()
  id: string

  @Column()
  name: string
}
