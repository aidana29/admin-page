import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tutorial {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "varchar", length: 255 })
  content: string | undefined;
}
