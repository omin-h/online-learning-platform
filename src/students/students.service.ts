import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Like } from 'typeorm';

@Injectable()
export class StudentsService {

  constructor(
     @InjectRepository(Student) private readonly studentRepository: Repository<Student>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<{ message: string; student: Student }> {
    try {  
      const student : Student = new Student();
      student.firstName = createStudentDto.firstName;
      student.lastName = createStudentDto.lastName;
      student.email = createStudentDto.email;
      student.userName = createStudentDto.userName;
      student.password = createStudentDto.password;
      student.enrollmentDate = createStudentDto.enrollmentDate;
      const savedStudent = await this.studentRepository.save(student);
      return { message: 'Student created successfully', student: savedStudent };
    } catch (error) {
      throw new BadRequestException('Error creating student: ' + error.message);
    }
  }

  async findAll({ page, limit, search }: PaginationQueryDto,): Promise<{ data: Student[]; total: number; page: number; limit: number }> {
     try{const skip = (page - 1) * limit;

      const [data, total] = await this.studentRepository.findAndCount({
        skip,
        take: limit,
        order: { id: 'DESC' },
        where: search ? [
          { firstName: Like(`%${search}%`) },
          { lastName: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
          { userName: Like(`%${search}%`) },
        ] : {},
      });
      return { data, total, page, limit };
    }catch (error) {
      throw new BadRequestException('Error fetching students: ' + error.message);
    }
  }

  async findOne(id: number): Promise<Student | null> {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise< { message: string; student: Student } > {
      const student : Student = new Student();
      student.id = id;
      student.firstName = updateStudentDto.firstName;
      student.lastName = updateStudentDto.lastName;
      student.email = updateStudentDto.email;
      student.userName = updateStudentDto.userName;
      student.password = updateStudentDto.password;
      student.enrollmentDate = updateStudentDto.enrollmentDate;
      try{
        const updatedStudent = await this.studentRepository.save(student);
      return { message: 'Student updated successfully', student: updatedStudent };
      }catch (error) {
        throw new BadRequestException('Error updating student: ' + error.message);
      }
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return { message: 'Student deleted successfully' };
  }
}

