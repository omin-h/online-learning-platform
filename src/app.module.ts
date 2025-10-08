import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstructorsModule } from './instructors/instructors.module';
import { Instructor } from './instructors/entities/instructor.entity';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { EnrollModule } from './enroll/enroll.module';
import { Enroll } from './enroll/entities/enroll.entity';
import { Student } from './students/entities/student.entity';
import { Course } from './courses/entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '1234',
      username: 'postgres',
      entities: [Instructor, Course, Student, Enroll],
      database: 'learning-platform',
      synchronize: true,
      logging: true,
    }),
    InstructorsModule,
    CoursesModule,
    StudentsModule,
    EnrollModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
