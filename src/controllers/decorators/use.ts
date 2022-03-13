import "reflect-metadata";
import { RequestHandler } from "express";
import { PropertyDecoratorFunction } from "./routes";
import { MetadataKeys } from "./MetadataKeys";

export function use(middleware: RequestHandler): PropertyDecoratorFunction {
  return function (target, key, desc) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || [];

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
}
