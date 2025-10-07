import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCourseDto extends PartialType(CreateCourseDto) {


        @IsNotEmpty()
        @IsString()
        title: string;
    
        @IsNotEmpty()
        @IsString()
        description: string;
    
        @IsNotEmpty()
        duration: number;
    
        @IsNotEmpty()
        @IsArray()
        @IsInt({ each: true })
        instructorIds: number[];
}
