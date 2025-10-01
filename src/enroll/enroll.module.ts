import { Module } from '@nestjs/common';
import { EnrollService } from './enroll.service';
import { EnrollController } from './enroll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enroll } from './entities/enroll.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enroll])],
  controllers: [EnrollController],
  providers: [EnrollService],
})
export class EnrollModule {}
