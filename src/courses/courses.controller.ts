import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UpdateInstructorDto } from 'src/instructors/dto/update-instructor.dto';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';
import { Query } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coursesService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Get('instructor/:instructorId')
  findByInstructor(@Param('instructorId') instructorId: string) {
    return this.coursesService.findByInstructor(+instructorId);
  }

  @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
      return this.coursesService.update(+id, updateCourseDto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
