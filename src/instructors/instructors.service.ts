import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Instructor } from './entities/instructor.entity';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { PaginationQueryDto } from '../common/pagination-query.dto';

@Injectable()
export class InstructorsService {

  constructor(
    @InjectRepository(Instructor) private readonly instructorRepository: Repository<Instructor>
  ) {}


  async create(createInstructorDto: CreateInstructorDto): Promise<{ message: string; instructor: Instructor }> {
    const instructor : Instructor = new Instructor();
    instructor.name = createInstructorDto.name;
    instructor.email = createInstructorDto.email;
    instructor.expertise = createInstructorDto.expertise;
    instructor.username = createInstructorDto.username;
    instructor.password = createInstructorDto.password;
    const savedInstructor = await this.instructorRepository.save(instructor);
    return { message: 'Instructor created successfully', instructor: savedInstructor };
    } catch (error) {
      throw new BadRequestException('Error creating instructor: ' + error.message);
    }


  async findAll({ page, limit, search }: PaginationQueryDto,
    ): Promise<{ data: Instructor[]; total: number; page: number; limit: number }> {
     try{ const skip = (page - 1) * limit;
     
      const [data, total] = await this.instructorRepository.findAndCount({
        skip,
        take: limit,
        where: search ? [
          { name: Like(`%${search}%`) },
          { email: Like(`%${search}%`) },
          { expertise: Like(`%${search}%`) },
          { username: Like(`%${search}%`) },
        ] : {},
      });
        return { data, total, page, limit };
    }catch (error) {
      throw new BadRequestException('Error fetching instructors: ' + error.message);
    }
  }

  async findAllInstructorCourses(): Promise<any[]> {
  try {
    const instructors = await this.instructorRepository.find({
      relations: ['courses'],
    });

    return instructors.map(instructor => ({
      id: instructor.id,
      name: instructor.name,
      expertise: instructor.expertise,
      courseIds: instructor.courses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        duration: course.duration,
      })),
    }));
  } catch (error) {
    throw new BadRequestException('Error fetching instructors: ' + error.message);
  }
}

  async findOne(id: number): Promise<Instructor | null> {
    const instructor = await this.instructorRepository.findOneBy({ id });
    if (!instructor) {
      throw new NotFoundException(`Instructor with id ${id} not found`);
    }
    return instructor;
  }


  async update(id: number, updateInstructorDto: UpdateInstructorDto): Promise<{ message: string; instructor: Instructor }> {
    const instructor: Instructor = new Instructor();
    instructor.id = id;
    instructor.name = updateInstructorDto.name;
    instructor.email = updateInstructorDto.email;
    instructor.expertise = updateInstructorDto.expertise;
    instructor.username = updateInstructorDto.username;
    instructor.password = updateInstructorDto.password;
    try{
      const updatedInstructor = await this.instructorRepository.save(instructor);
    return { message: 'Instructor updated successfully', instructor: updatedInstructor };
    }catch (error) {
      throw new BadRequestException('Error updating instructor: ' + error.message);
    }
  }


  // async remove(id: number): Promise<{ message: string }> {
  //   const result = await this.instructorRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`Instructor with id ${id} not found`);
  //   }
  //   return { message: 'Instructor removed successfully' };
  // }

  async remove(id: number): Promise<{ message: string }> {
  const result = await this.instructorRepository.softDelete(id);
  if (result.affected === 0) {
    throw new NotFoundException(`Instructor with id ${id} not found`);
  }
  return { message: 'Instructor removed successfully' };
}
}
