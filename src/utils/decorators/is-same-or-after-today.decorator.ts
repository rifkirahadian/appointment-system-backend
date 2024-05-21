/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Custom constraint class
@ValidatorConstraint({ async: false })
export class IsSameOrAfterTodayConstraint
  implements ValidatorConstraintInterface
{
  validate(dateString: any, args: ValidationArguments) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time to the start of today

    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0); // Reset the time to the start of the provided date

    return date >= today;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Date must be the same as or later than today';
  }
}

// Custom decorator
export function IsSameOrAfterToday(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSameOrAfterTodayConstraint,
    });
  };
}
