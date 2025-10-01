import { IsAlphanumeric, IsNotEmpty, IsString } from "class-validator";

export class CreateStudentDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()  
    @IsAlphanumeric(undefined, { message: 'Username does not allow other than alpha numeric chars.' }) 
    userName: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    enrollmentDate: Date;

}

