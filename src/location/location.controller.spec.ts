import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { PrismaService } from '../common/services/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

describe('LocationController', () => {
  let controller: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService, PrismaService],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    locationService = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it('should create root location', async () => {
      // Arrange
      const createLocationDto: CreateLocationDto = {
        locationName: 'Test Location',
        locationNumber: '123',
        area: 123,
      };

      const locationCreateInput = {
        locationName: createLocationDto.locationName,
        locationNumber: createLocationDto.locationNumber,
        area: createLocationDto.area,
      };
      jest.spyOn(locationService, 'isRecordExisted').mockResolvedValue(false);
      jest.spyOn(locationService, 'create').mockResolvedValue({} as any);

      // Act
      const result = await controller.create(createLocationDto);

      // Assert
      expect(locationService.create).toHaveBeenCalledWith(locationCreateInput);
      expect(result).toBeDefined();
    });

    // it provide parent id not existed in the database
    it('should throw an error if parent id not existed', async () => {
      // Arrange
      const createLocationDto: CreateLocationDto = {
        parentId: 9999,
        locationName: 'Test Location',
        locationNumber: '123',
        area: 212,
      };

      jest.spyOn(locationService, 'isRecordExisted').mockResolvedValue(false);

      // Act & Assert
      await expect(controller.create(createLocationDto)).rejects.toThrowError(
        'Invalid parent ID',
      );
    });
  });
  describe('update', () => {
    it('should update location', async () => {
      // Arrange
      const locationId = 1;
      const updateLocationDto = {
        locationName: 'Updated Location',
        locationNumber: '123',
        area: 123,
      };
      jest.spyOn(locationService, 'findOne').mockResolvedValue({} as any);
      jest.spyOn(locationService, 'update').mockResolvedValue({} as any);

      // Act
      const result = await controller.update(
        locationId.toString(),
        updateLocationDto,
      );

      // Assert
      expect(locationService.findOne).toHaveBeenCalledWith(locationId);
      expect(locationService.update).toHaveBeenCalledWith(
        locationId,
        updateLocationDto,
      );
      expect(result).toBeDefined();
    });

    it('should throw an error if location not found', async () => {
      // Arrange
      const locationId = 1;
      const updateLocationDto = {
        locationName: 'Updated Location',
        locationNumber: '123',
        area: 123,
      };
      jest.spyOn(locationService, 'findOne').mockResolvedValue(null);

      // Act & Assert
      await expect(
        controller.update(locationId.toString(), updateLocationDto),
      ).rejects.toThrowError('No location found with this ID');
    });
  });
  describe('findById', () => {
    it('should return a location by id', async () => {
      // Arrange
      const locationId = 1;
      jest.spyOn(locationService, 'findOne').mockResolvedValue({} as any);

      // Act
      const result = await controller.findOne(locationId.toString());

      // Assert
      expect(locationService.findOne).toHaveBeenCalledWith(locationId);
      expect(result).toBeDefined();
    });

    it('should throw an error if location not found', async () => {
      // Arrange
      const locationId = 1;
      jest.spyOn(locationService, 'findOne').mockResolvedValue(null);

      // Act & Assert
      await expect(
        controller.findOne(locationId.toString()),
      ).rejects.toThrowError('Location not found');
    });
  });
});
