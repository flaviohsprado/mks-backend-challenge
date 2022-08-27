import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './../../domain/entities/user.entity';
import { UserRepository } from './../../domain/repositories/user.repository';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userEntityRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userEntityRepository.findOne({ where: { id } });
  }

  create(user: User): Promise<User> {
    const newUser = this.userEntityRepository.create(user);
    return this.userEntityRepository.save(newUser);
  }

  update(id: string, user: User): Promise<User> {
    return this.userEntityRepository.save({ ...user, id });
  }

  delete(id: string): Promise<void> {
    this.userEntityRepository.delete(id);
    return;
  }
}
