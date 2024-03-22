import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  BadRequestException,
  ParseIntPipe,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from '@prisma/client';
import { HasPropertyPipe } from '../pipes/has-property.pipe';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  async create(@Body(ValidationPipe) createLocationDto: CreateLocationDto) {
    // throw error if location number already existed or parent id not existed
    if (
      createLocationDto.parentId &&
      !(await this.locationService.isRecordExisted({
        id: createLocationDto.parentId,
      }))
    ) {
      throw new BadRequestException('Invalid parent ID');
    }

    try {
      return await this.locationService.create(createLocationDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A location with this parent ID and location number already exists',
        );
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<Location | null> {
    const location = await this.locationService.findOne(+id);
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body(HasPropertyPipe) updateLocationDto: UpdateLocationDto,
  ) {
    // validate location id exists
    const location = await this.locationService.findOne(+id);

    if (!location) {
      throw new NotFoundException('No location found with this ID');
    }
    try {
      return await this.locationService.update(+id, updateLocationDto);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'A location with this parent ID and location number already exists',
        );
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    if (!(await this.locationService.findOne(+id))) {
      throw new NotFoundException('Location not found');
    }
    return this.locationService.remove(+id);
  }
}
