import { isNumber } from 'lodash';
import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';

export class TimestampTransformer implements ValueTransformer {
  to(value): Date | number {
    if (isNumber(value)) {
      return new Date(value * 1000);
    }
    return value;
  }

  from(value): Date | number {
    if (!value) {
      return value;
    }
    return Math.round(+new Date(value) / 1000);
  }
}
