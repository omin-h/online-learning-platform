import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Like, Repository } from 'typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

@Injectable()
export class CoursesService {

  constructor(
      @InjectRepository(Course) private readonly courseRepository: Repository<Course>
    ) {}

  async create(createCourseDto: CreateCourseDto): Promise<{ message: string; course: Course }> {
    const course = new Course();
    course.title = createCourseDto.title;
    course.description = createCourseDto.description;
    course.duration = createCourseDto.duration;
    course.instructors = createCourseDto.instructorIds.map(id => ({ id } as Instructor));
    try{ const savedCourse = await this.courseRepository.save(course);
    return { message: 'Course created successfully', course: savedCourse };
    }catch (error) {
      throw new BadRequestException('Error creating course: ' + error.message);
    }
  }

  async findAll({ page, limit, search }: PaginationQueryDto,): Promise<{ data: Course[]; total: number; page: number; limit: number }> {
       try{const skip = (page - 1) * limit;

        const [data, total] = await this.courseRepository.findAndCount({
          skip,
          take: limit,
          where: search ? [
            { title: Like(`%${search}%`) },
            { description: Like(`%${search}%`) },
          ] : {},
        });
        return { data, total, page, limit };
      } catch (error) {
          throw new BadRequestException('Error fetching courses: ' + error.message);
        }
  }

  findOne(id: number): Promise<Course | null> {
      const course = this.courseRepository.findOneBy({ id });
      if (!course) {
        throw new NotFoundException(`Course with id ${id} not found`);
      }
      return course;
    }


  async findByInstructor(instructorId: number): Promise<Course[]> {
  const courses = await this.courseRepository.find({
    where: { instructors: { id: instructorId } },
    relations: ['instructors'],
  });
  if (courses.length === 0) {
    throw new NotFoundException(`No courses found for instructor with id ${instructorId}`);
  }
  return courses;
}

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<{ message: string; course: Course }> {
  const course: Course = new Course();
  course.id = id;
  course.title = updateCourseDto.title;
  course.description = updateCourseDto.description;
  course.duration = updateCourseDto.duration;

  if (!Array.isArray(updateCourseDto.instructorIds)) {
    throw new BadRequestException('instructorIds must be an array of numbers');
  }
  course.instructors = updateCourseDto.instructorIds.map(id => ({ id } as Instructor));

  try {
    const updatedCourse = await this.courseRepository.save(course);
    return { message: 'Course updated successfully', course: updatedCourse };
  } catch (error) {
    throw new BadRequestException('Error updating course: ' + error.message);
  }
}

   async remove(id: number): Promise<{ message: string }> {

       const result = await this.courseRepository.delete(id);
       if (result.affected === 0) {
         throw new NotFoundException(`Course with id ${id} not found`);
       }
       return { message: 'Course removed successfully' };
   }
}
