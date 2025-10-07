import { IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {

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
