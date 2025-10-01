import { Course } from "src/courses/entities/course.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "src/students/entities/student.entity";

@Entity()
export class Enroll {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Course, course => course.enrollments, { onDelete: 'CASCADE' })
    course: Course;

    @ManyToOne(() => Student, student => student.enrollments, { onDelete: 'CASCADE' })
    student: Student;

    @Column()
    enrollmentDate: Date;

    @Column({ type: 'enum', enum: ['approved', 'rejected', 'pending'] })
    status: string;
}
