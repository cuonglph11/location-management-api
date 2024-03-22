import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { Prisma } from '@prisma/client'; // Import the missing Prisma namespace

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLocationDto: Prisma.LocationCreateInput) {
    return this.prisma.location.create({ data: createLocationDto });
  }

  findAll(filter?: Prisma.LocationWhereInput) {
    return this.prisma.location.findMany({ where: filter });
  }
  async isRecordExisted(filter: Prisma.LocationWhereInput) {
    const result = await this.prisma.location.findFirst({ where: filter });
    if (result === null) {
      return false;
    }

    return true;
  }

  findOne(id: number) {
    return this.prisma.location.findUnique({ where: { id } });
  }

  update(id: number, updateLocationDto: Prisma.LocationUpdateInput) {
    return this.prisma.location.update({
      where: { id },
      data: updateLocationDto,
    });
  }

  remove(id: number) {
    return this.prisma.location.delete({
      where: { id },
    });
  }
}
