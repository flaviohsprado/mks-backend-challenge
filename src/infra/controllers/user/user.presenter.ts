import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../domain/entities/user.entity';

export class UserPresenter {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public username: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
