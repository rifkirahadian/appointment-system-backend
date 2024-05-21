/* eslint-disable @typescript-eslint/ban-types */
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Custom constraint class
@ValidatorConstraint({ async: false })
export class IsWeekdayConstraint implements ValidatorConstraintInterface {
  validate(dateString: any) {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
    return dayOfWeek >= 1 && dayOfWeek <= 5; // Monday to Friday are weekdays
  }

  defaultMessage() {
    return 'Date must be a weekday (Monday to Friday)';
  }
}

// Custom decorator
export function IsWeekday(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsWeekdayConstraint,
    });
  };
}
