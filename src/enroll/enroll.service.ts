import { Injectable } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { UpdateEnrollDto } from './dto/update-enroll.dto';
import { Student } from 'src/students/entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enroll } from './entities/enroll.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class EnrollService {

  constructor(
  @InjectRepository(Enroll) private readonly enrollRepository: Repository<Enroll>
  ) {}

  async create(createEnrollDto: CreateEnrollDto): Promise<Enroll> {
    const enroll = new Enroll();
    enroll.course = { id: createEnrollDto.courseId } as Course;
    enroll.student = { id: createEnrollDto.studentId } as Student;
    enroll.enrollmentDate = createEnrollDto.enrollmentDate;
    enroll.status = "pending";
    return this.enrollRepository.save(enroll);
  }
  
  findAll() {
    return this.enrollRepository.find();
  }

  findOne(id: number) {
    return this.enrollRepository.findOneBy({ id });
  }

  update(id: number, updateEnrollDto: UpdateEnrollDto) {
    return this.enrollRepository.save({ id, ...updateEnrollDto });
  }

  remove(id: number) {
    return this.enrollRepository.delete(id);
  }
}
