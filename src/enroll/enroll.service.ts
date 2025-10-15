import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateEnrollDto } from './dto/create-enroll.dto';
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
  
  async findAll(): Promise<Enroll[]> {
    try {
      return await this.enrollRepository.find({
        order: { id: 'DESC' },
        relations: ['student', 'course'],  
      });
    } catch (error) {
      throw new BadRequestException('Error fetching enrollments: ' + error.message);
    }
  }

  findOne(id: number) {
    return this.enrollRepository.findOneBy({ id });
  }

  async findByStudent(studentId: number): Promise<Enroll[]> {
  try {
    const enrollments = await this.enrollRepository.find({
      where: { student: { id: studentId } },
      relations: ['student', 'course'],
    });
    if (enrollments.length === 0) {
      throw new NotFoundException(`No enrollments found for student with id ${studentId}`);
    }
    return enrollments;
  } catch (error) {
    throw new BadRequestException('Error fetching enrollments: ' + error.message);
  }
}

  async updateStatus(id: number, status: string): Promise<Enroll> {
  const enroll = await this.enrollRepository.findOneBy({ id });
  if (!enroll) {
    throw new NotFoundException('Enrollment not found');
  }
  enroll.status = status;
  return this.enrollRepository.save(enroll);
  }


  async remove(id: number): Promise<{ message: string }> {
  const result = await this.enrollRepository.delete(id);
       if (result.affected === 0) {
         throw new NotFoundException(`Enrollment with id ${id} not found`);
       }
       return { message: 'Unenrollment successful' };
  }
}

