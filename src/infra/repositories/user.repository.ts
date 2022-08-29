import { Injectable, NotFoundException } from '@nestjs/common';
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

  public async findAll(): Promise<User[]> {
    return this.userEntityRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    console.log('UUID: ', id);
    const user = await this.userEntityRepository.findOne({
      where: { id },
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return user;
  }

  public async create(user: User): Promise<User> {
    const newUser = this.userEntityRepository.create(user);
    return this.userEntityRepository.save(newUser);
  }

  public async update(id: string, user: User): Promise<User> {
    return this.userEntityRepository.save({ ...user, id });
  }

  public async delete(id: string): Promise<void> {
    this.userEntityRepository.delete(id);
    return;
  }
}