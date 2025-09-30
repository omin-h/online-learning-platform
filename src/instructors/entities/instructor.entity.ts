import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Instructor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    name: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @Column({ type: 'varchar', length: 100 })
    expertise: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    username: string;

    @Column({ type: 'varchar' })
    password: string;
}
