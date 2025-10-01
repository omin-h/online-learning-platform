import { Enroll } from "src/enroll/entities/enroll.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    enrollmentDate: Date;

    @OneToMany(() => Enroll, enroll => enroll.student)
    enrollments: Enroll[];
}
