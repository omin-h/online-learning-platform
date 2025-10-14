import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/students/entities/student.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()

export class AuthService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private jwtService: JwtService,
  ) {}

  async loginStudent(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const student = await this.studentRepository.findOne({
      where: { userName: username },
    });

    if (!student || !(await bcrypt.compare(password, student.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: student.id, username: student.userName, role: 'student' };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: student.id,
        username: student.userName,
        firstName: student.firstName,
        lastName: student.lastName,
        role: 'student',
      },
    };
  }

  async loginAdmin(loginDto: LoginDto) {
    const { username, password } = loginDto;

    if (username !== 'admin' || password !== 'admin123') {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    const payload = { sub: 0, username: 'admin', role: 'admin' };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        username: 'admin',
        role: 'admin',
      },
    };
  }
}