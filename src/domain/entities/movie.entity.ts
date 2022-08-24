import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptionalUpdateDateColumn } from '../../main/decorators/columns/isOptionalUpdateDateColumn.decorator';
import { IsRequiredCreateDateColumn } from '../../main/decorators/columns/isRequiredCreateDateColumn.decorator';
import { IsRequiredDateColumn } from '../../main/decorators/columns/isRequiredDateColumn.decorator';
import { IsRequiredNumberColumn } from '../../main/decorators/columns/isRequiredNumberColumn.decorator';
import { IsRequiredStringColumn } from '../../main/decorators/columns/isRequiredStringColumn.decorator';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @IsRequiredStringColumn()
  public title: string;

  @IsRequiredStringColumn()
  public description: string;

  @IsRequiredDateColumn()
  public releaseDate: Date;

  @IsRequiredStringColumn()
  public duration: string;

  @IsRequiredNumberColumn()
  public rating: number;

  @IsRequiredCreateDateColumn()
  public createdAt: Date;

  @IsOptionalUpdateDateColumn()
  public updatedAt: Date;
}
