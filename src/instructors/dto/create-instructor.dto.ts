import { IsString, IsEmail, IsNotEmpty, IsAlphanumeric, IsArray } from "class-validator";

export class CreateInstructorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsArray()
    expertise: string[];

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric(undefined, { message: 'Username does not allow other than alpha numeric chars.' })
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;


}

