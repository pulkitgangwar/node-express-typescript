import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.session?.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};
