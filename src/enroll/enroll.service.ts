import { Injectable, BadRequestException } from '@nestjs/common';
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

  async create(createEnrollDto: CreateEnrollDto): Promise<{ message: string; enroll: Enroll }> {
    const enroll = new Enroll();
    enroll.course = { id: createEnrollDto.courseId } as Course;
    enroll.student = { id: createEnrollDto.studentId } as Student;
    enroll.enrollmentDate = createEnrollDto.enrollmentDate;
    enroll.status = "pending";
    try{ const savedEnroll = await this.enrollRepository.save(enroll);
    return { message: 'Enrollment request sent successfully', enroll: savedEnroll };
    }catch (error) {
      throw new BadRequestException('Error sending enrollment: ' + error.message);
    }
  }
  
  findAll() {
    try{return this.enrollRepository.find();
    }catch (error) {
      throw new BadRequestException('Error fetching enrollments: ' + error.message);
    }
  }

  findOne(id: number) {
    return this.enrollRepository.findOneBy({ id });
  }

  async updateStatus(id: number, status: string): Promise<Enroll> {
  const enroll = await this.enrollRepository.findOneBy({ id });
  if (!enroll) {
    throw new Error('Enrollment not found');
  }
  enroll.status = status;
  return this.enrollRepository.save(enroll);
  }

  remove(id: number) {
    return this.enrollRepository.delete(id);
  }
}
