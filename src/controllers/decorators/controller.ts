import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { MetadataKeys } from "./MetadataKeys";
import { Methods } from "./Methods";
import { RequestHandler } from "express";

function validateBody(keys: string[]): RequestHandler {
  return function (req, res, next) {
    if (!req.body) return res.status(422).send("Invalid request");

    for (let key of keys) {
      if (!req.body[key]) return res.status(422).send(`Missing keys ${key}`);
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function): void {
    for (let key in target.prototype) {
      const router = AppRouter.getInstance();
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const body: string[] =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validate = validateBody(body);

      if (path) {
        console.log({ path, method, middlewares });
        router[method](
          routePrefix + path,
          ...middlewares,
          validate,
          routeHandler
        );
      }
    }
  };
}
