import { RequestHandler } from "express";
import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";

interface RequestHandlerPropertyDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

export type PropertyDecoratorFunction = (
  target: any,
  key: string,
  desc: RequestHandlerPropertyDescriptor
) => void;

function routeBinder(method: string) {
  return function (path: string): PropertyDecoratorFunction {
    return function (target: any, key: string) {
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
    };
  };
}

export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
export const patch = routeBinder(Methods.patch);
