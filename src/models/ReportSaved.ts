import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("reportSaved")
export class ReportSaved {
  @PrimaryColumn()
  test_id: number;

  @Column("simple-json")
  answers: {};
}

export default ReportSaved;
