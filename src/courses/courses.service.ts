import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { Instructor } from 'src/instructors/entities/instructor.entity';

@Injectable()
export class CoursesService {

  constructor(
      @InjectRepository(Course) private readonly courseRepository: Repository<Course>
    ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new Course();
    course.title = createCourseDto.title;
    course.description = createCourseDto.description;
    course.duration = createCourseDto.duration;
    course.instructor = { id: createCourseDto.instructorId } as any;
    return this.courseRepository.save(course);
  }

  findAll() {
    return this.courseRepository.find();
  }

  findOne(id: number): Promise<Course | null> {
      return this.courseRepository.findOneBy({ id });
    }


  async findByInstructor(instructorId: number): Promise<Course[]> {
  return this.courseRepository.find({
    where: { instructor: { id: instructorId } },
    relations: ['instructor'],
  });
}

  update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
      const course: Course = new Course();
      course.id = id;
      course.title = updateCourseDto.title;
      course.description = updateCourseDto.description;
      course.duration = updateCourseDto.duration;
      course.instructor = { id: updateCourseDto.instructorId } as Instructor;
      return this.courseRepository.save(course);
    }

   remove(id: number): Promise<void> {
    return this.courseRepository.delete(id).then(() => {});
  }
}
