import { PartialType } from '@nestjs/mapped-types';
import { CreateInstructorDto } from './create-instructor.dto';
import { IsNotEmpty } from 'class-validator/types/decorator/common/IsNotEmpty';
import { IsString } from 'class-validator/types/decorator/typechecker/IsString';
import { IsAlphanumeric, IsEmail } from 'class-validator';

export class UpdateInstructorDto extends PartialType(CreateInstructorDto) {
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
