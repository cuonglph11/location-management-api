import { PartialType } from '@nestjs/swagger';
import { CreateLocationDto } from './create-location.dto';
import { IsOptional } from 'class-validator';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
  @IsOptional()
  locationName?: string | undefined;
}
