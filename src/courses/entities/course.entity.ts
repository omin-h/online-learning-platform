import { Enroll } from "src/enroll/entities/enroll.entity";
import { Instructor } from "src/instructors/entities/instructor.entity";
import { Column, Entity, ManyToOne, ManyToMany, OneToMany, PrimaryGeneratedColumn, JoinTable } from "typeorm";

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

    @ManyToMany(() => Instructor, instructor => instructor.courses)
    @JoinTable()
    instructors: Instructor[];

    @OneToMany(() => Enroll, enroll => enroll.course)
    enrollments: Enroll[];
}
