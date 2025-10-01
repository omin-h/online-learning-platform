import { PartialType } from '@nestjs/mapped-types';
import { CreateEnrollDto } from './create-enroll.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateEnrollDto extends PartialType(CreateEnrollDto) {

        @IsNotEmpty()
        courseId: number;
    
        @IsNotEmpty()
        studentId: number;
    
        @IsNotEmpty()
        enrollmentDate: Date;
    
        @IsNotEmpty()
        status: string;

}
