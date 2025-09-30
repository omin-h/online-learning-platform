import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from './entities/instructor.entity';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@Injectable()
export class InstructorsService {

  constructor(
    @InjectRepository(Instructor) private readonly instructorRepository: Repository<Instructor>
  ) {}


  create(createInstructorDto: CreateInstructorDto): Promise<Instructor> {
    const instructor : Instructor = new Instructor();
    instructor.name = createInstructorDto.name;
    instructor.email = createInstructorDto.email;
    instructor.expertise = createInstructorDto.expertise;
    instructor.username = createInstructorDto.username;
    instructor.password = createInstructorDto.password;
    return this.instructorRepository.save(instructor);
  }


  findAll(): Promise<Instructor[]> {
    return this.instructorRepository.find();
  }


  findOne(id: number): Promise<Instructor | null> {
    return this.instructorRepository.findOneBy({ id });
  }


  update(id: number, updateInstructorDto: UpdateInstructorDto): Promise<Instructor> {
    const instructor: Instructor = new Instructor();
    instructor.id = id;
    instructor.name = updateInstructorDto.name;
    instructor.email = updateInstructorDto.email;
    instructor.expertise = updateInstructorDto.expertise;
    instructor.username = updateInstructorDto.username;
    instructor.password = updateInstructorDto.password;
    return this.instructorRepository.save(instructor);
  }


  remove(id: number): Promise<void> {
    return this.instructorRepository.delete(id).then(() => {});
  }
}
