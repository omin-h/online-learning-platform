import { IsString, IsEmail, IsNotEmpty, IsAlphanumeric } from "class-validator";

export class CreateInstructorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    expertise: string;

    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric(undefined, { message: 'Username does not allow other than alpha numeric chars.' })
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;


}

