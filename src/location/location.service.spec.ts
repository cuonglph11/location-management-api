import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { PrismaService } from '../common/services/prisma.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationService, PrismaService],
    }).compile();

    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create root location', async () => {
      const createLocationDto = {
        locationName: 'Root location',
        locationNumber: '123',
        area: 1200,
      };

      const createdLocation = await service.create(createLocationDto);

      expect(createdLocation).toBeDefined();
      await service.remove(createdLocation.id);
    });

    it('should create child location', async () => {
      // Create parent location
      const createParentLocationDto = {
        locationName: 'Parent location',
        locationNumber: '456',
        area: 2400,
      };

      const createdParentLocation = await service.create(
        createParentLocationDto,
      );

      // Create child location
      const createLocationDto = {
        locationName: 'Child location',
        locationNumber: '123',
        area: 1200,
        parentId: createdParentLocation.id, // Use the ID of the newly created parent
      };

      const createdLocation = await service.create(createLocationDto);

      expect(createdLocation).toBeDefined();
      await service.remove(createdLocation.id);
      await service.remove(createdParentLocation.id);
    });
    it('should throw an error if parentId is invalid', async () => {
      const createLocationDto = {
        locationName: 'Unmatched location',
        locationNumber: '123',
        area: 1200,
        parentId: 9999,
      };

      try {
        await service.create(createLocationDto);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('findAll', () => {
    it('should return an array of locations', async () => {
      const locations = await service.findAll();

      expect(locations).toBeDefined();
      expect(Array.isArray(locations)).toBe(true);
      // Add additional assertions as needed
    });
  });

  describe('findOne', () => {
    it('should return a location by id', async () => {
      const locationId = 1;
      const location = await service.findOne(locationId);

      expect(location).toBeDefined();
      // Add additional assertions as needed
    });
  });

  describe('isRecordExisted', () => {
    it('should return true if record exists by filtering with id', async () => {
      // Arrange
      const createLocationDto = {
        locationName: 'New location',
        locationNumber: '789',
        area: 3000,
      };

      // Create new location
      const createdLocation = await service.create(createLocationDto);

      // Use the ID of the newly created location
      const filter = { id: createdLocation.id };

      // Act
      const result = await service.isRecordExisted(filter);

      // Assert
      expect(result).toBe(true);
      await service.remove(createdLocation.id);
    });

    it('should return false if record does not exist  filtering with id', async () => {
      // Arrange
      const filter = { id: 9999 };

      // Act
      const result = await service.isRecordExisted(filter);

      // Assert
      expect(result).toBe(false);
    });
    it('should return true if record exists by filtering with locationNumber and area', async () => {
      // Arrange
      const createLocationDto = {
        locationName: 'New location',
        locationNumber: '789',
        area: 3000,
      };
      try {
        // Create new location
        const createdLocation = await service.create(createLocationDto);

        // Use the ID of the newly created location
        const filter = { locationNumber: '789', area: createdLocation.area };
        // Act
        const result = await service.isRecordExisted(filter);
        // console.log({ filter, result });

        // Assert
        expect(result).toBe(true);
        await service.remove(createdLocation.id);
      } catch (error) {
        console.log(error, 'errorerrorerror');
      }
    });
    it('should return true if record exists by filtering with parentId', async () => {
      // Arrange
      // create parent location
      const createParentLocationDto = {
        locationName: 'New location',
        locationNumber: '789',
        area: 3000,
      };

      const parentLocation = await service.create(createParentLocationDto);
      const childLocationDto = {
        locationName: 'Child location',
        locationNumber: '123',
        area: 1200,
        parentId: parentLocation.id,
      };

      // Create child location
      const childLocation = await service.create(childLocationDto);

      // Use the ID of the newly created child location
      const filter = { parentId: parentLocation.id };

      // Act
      const result = await service.isRecordExisted(filter);
      console.log({ filter, result });

      // Assert
      expect(result).toBe(true);
      await service.remove(parentLocation.id);
      await service.remove(childLocation.id);
    });
    it('should return false if record does not exists by filtering with locationNumber and parentId', async () => {
      // Arrange
      const filter = { locationNumber: '123', parentId: 4 };

      // Act
      const result = await service.isRecordExisted(filter);

      // Assert
      expect(result).toBe(false);
    });
  });
});
