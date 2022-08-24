import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsOptionalStringColumn } from '../../main/decorators/columns/isOptionalStringColumn.decorator';
import { IsRequiredStringColumn } from '../../main/decorators/columns/isRequiredStringColumn.decorator';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsRequiredStringColumn()
  public username: string;

  @IsOptionalStringColumn()
  public email: string;

  @IsRequiredStringColumn()
  public password: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
