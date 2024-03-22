import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class HasPropertyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (Object.keys(value).length === 0) {
      throw new BadRequestException(
        'Request body must have at least one valid property',
      );
    }
    return value;
  }
}
