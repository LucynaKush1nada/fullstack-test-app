import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WarehouseItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productName: string;

  @Column({ default: 0 })
  quantity: number;
}
