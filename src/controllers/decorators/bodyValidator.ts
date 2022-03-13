import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { PropertyDecoratorFunction } from "./routes";

export function bodyValidator(...keys: string[]): PropertyDecoratorFunction {
  return function (target, key, desc) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
