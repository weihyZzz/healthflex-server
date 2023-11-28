import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Temp } from './models/temp.entity';
@Injectable()
export class TempService {
  constructor(
    @InjectRepository(Temp)
    private readonly studentRepository: Repository<Temp>,
  ) {}

  async findByAccount(account: string): Promise<Temp> {
    return this.studentRepository.findOne({
      where: {
        account,
      },
    });
  }

  async create(entity: DeepPartial<Temp>): Promise<boolean> {
    const res = await this.studentRepository.save(
      this.studentRepository.create(entity),
    );
    if (res) {
      return true;
    }
    return false;
  }

  async findById(id: string): Promise<Temp> {
    return this.studentRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, entity: DeepPartial<Temp>): Promise<boolean> {
    const res = await this.studentRepository.update(id, entity);
    if (res.affected > 0) {
      return true;
    }
    return false;
  }

  async findStudents({
    start,
    length,
  }: {
    start: number;
    length: number;
  }): Promise<[Temp[], number]> {
    return this.studentRepository.findAndCount({
      take: length,
      skip: start,
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
