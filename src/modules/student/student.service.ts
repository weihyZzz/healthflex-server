import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './models/student.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findByAccount(account: string): Promise<Student> {
    const res = await this.studentRepository.findOne({
      where: {
        account,
      },
    });
    return res;
  }
  async create(entity: DeepPartial<Student>): Promise<boolean> {
    const res = await this.studentRepository.insert(entity);
    if (res && res.raw.affectedRows > 0) {
      return true;
    }
    return false;
  }
  async findById(id: string): Promise<Student> {
    const res = await this.studentRepository.findOne({
      where: {
        id,
      },
    });
    return res;
  }
  async updateById(id: string, entity: DeepPartial<Student>): Promise<boolean> {
    const res = await this.studentRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }
}
