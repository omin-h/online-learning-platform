import { Enroll } from "src/enroll/entities/enroll.entity";
import { Instructor } from "src/instructors/entities/instructor.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Course {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30 })
    title: string;

    @Column({ length: 100 })
    description: string;

    @Column()
    duration: number;

    @ManyToOne(() => Instructor, instructor => instructor.courses)
    instructor: Instructor;

    @OneToMany(() => Enroll, enroll => enroll.course)
    enrollments: Enroll[];
}
