import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Course, course => course.instructors)
    courses: Course[];
}
