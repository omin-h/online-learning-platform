import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StudentsService {

  constructor(
     @InjectRepository(Student) private readonly studentRepository: Repository<Student>
  ) {}

  create(createStudentDto: CreateStudentDto): Promise<Student> {
      const student : Student = new Student();
      student.firstName = createStudentDto.firstName;
      student.lastName = createStudentDto.lastName;
      student.email = createStudentDto.email;
      student.userName = createStudentDto.userName;
      student.password = createStudentDto.password;
      student.enrollmentDate = createStudentDto.enrollmentDate;
      return this.studentRepository.save(student);
    }

  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  findOne(id: number): Promise<Student | null> {
    return this.studentRepository.findOneBy({ id });
  }

  update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
      const student : Student = new Student();
      student.id = id;
      student.firstName = updateStudentDto.firstName;
      student.lastName = updateStudentDto.lastName;
      student.email = updateStudentDto.email;
      student.userName = updateStudentDto.userName;
      student.password = updateStudentDto.password;
      student.enrollmentDate = updateStudentDto.enrollmentDate;
      return this.studentRepository.save(student);
    }

  remove(id: number): Promise<void> {
    return this.studentRepository.delete(id).then(() => {});
  }
}

