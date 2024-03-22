import { BadRequestException } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces';
import { HasPropertyPipe } from './has-property.pipe';

describe('HasPropertyPipe', () => {
  let pipe: HasPropertyPipe;

  beforeEach(() => {
    pipe = new HasPropertyPipe();
  });

  describe('transform', () => {
    it('should throw BadRequestException if value is an empty object', () => {
      // Arrange
      const value = {};
      const metadata: ArgumentMetadata = { type: 'body' };

      // Act & Assert
      expect(() => pipe.transform(value, metadata)).toThrow(
        BadRequestException,
      );
    });

    it('should not throw BadRequestException if value has at least one property', () => {
      // Arrange
      const value = { name: 'John Doe', age: 30 };
      const metadata: ArgumentMetadata = { type: 'body' };

      // Act & Assert
      expect(() => pipe.transform(value, metadata)).not.toThrow(
        BadRequestException,
      );
    });

    it('should return the value unchanged', () => {
      // Arrange
      const value = { name: 'John Doe', age: 30 };
      const metadata: ArgumentMetadata = { type: 'body' };

      // Act
      const transformedValue = pipe.transform(value, metadata);

      // Assert
      expect(transformedValue).toEqual(value);
    });
  });
});
