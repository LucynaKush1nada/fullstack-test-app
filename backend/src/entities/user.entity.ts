import { Role } from 'src/enums/role';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
    role: string;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[];
}