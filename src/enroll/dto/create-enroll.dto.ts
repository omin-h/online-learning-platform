import { IsNotEmpty } from "class-validator";

export class CreateEnrollDto {

    @IsNotEmpty()
    courseId: number;

    @IsNotEmpty()
    studentId: number;

    @IsNotEmpty()
    enrollmentDate: Date;
}
