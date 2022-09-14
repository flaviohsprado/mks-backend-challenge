import { User } from './../../domain/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseAuthRepository } from './auth.repository';
import { JwtModule } from '../services/jwt/jwt.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule,
    BcryptModule,
  ],
  providers: [DatabaseUserRepository, DatabaseAuthRepository],
  exports: [DatabaseUserRepository, DatabaseAuthRepository],
})
export class RepositoriesModule {}
