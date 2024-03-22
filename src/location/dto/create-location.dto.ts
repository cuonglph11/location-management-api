import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  parentId?: number;

  @IsNotEmpty()
  @IsString()
  locationName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  locationNumber?: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  area: number;
}
