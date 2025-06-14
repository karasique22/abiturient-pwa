import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidateIf,
  IsString,
} from 'class-validator';

@ValidatorConstraint({ name: 'onlyOne', async: false })
class OnlyOneConstraint implements ValidatorConstraintInterface {
  validate(_value: any, args: ValidationArguments) {
    const obj = args.object as any;
    const [relatedPropertyName] = args.constraints;
    const relatedValue = obj[relatedPropertyName];
    const value = (obj as any)[args.property];
    const hasCurrent = value !== undefined && value !== null && value !== '';
    const hasRelated = relatedValue !== undefined && relatedValue !== null && relatedValue !== '';
    return (hasCurrent || hasRelated) && !(hasCurrent && hasRelated);
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `Either ${args.property} or ${relatedPropertyName} must be provided, but not both`;
  }
}

function OnlyOne(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: OnlyOneConstraint,
    });
  };
}

export class CreateApplicationDto {
  @OnlyOne('eventId')
  @ValidateIf(o => o.programId !== undefined)
  @IsString()
  programId?: string;

  @OnlyOne('programId')
  @ValidateIf(o => o.eventId !== undefined)
  @IsString()
  eventId?: string;
}
