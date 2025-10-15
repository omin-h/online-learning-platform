import { Course } from "src/courses/entities/course.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Instructor {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    name: string;

    @Column({ length: 100 })
    email: string;

    @Column("simple-array")
    expertise: string[];

    @Column({ length: 15, unique: true })
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => Course, course => course.instructors)
    courses: Course[];

    @DeleteDateColumn()
    deletedAt?: Date;
}
