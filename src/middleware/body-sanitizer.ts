import { NextFunction, Request, Response } from "express";
import sanitizeHtml from "sanitize-html";

export function bodySanitizerMiddleware(req: Request, res: Response, next: NextFunction) {
  const body = req.body as any;
  Object.keys(body).forEach(key => {
    if (typeof body[key] === 'string') {
      body[key] = sanitizeHtml(body[key]);
    }
  });

  next();
}