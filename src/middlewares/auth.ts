import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default function auth(request: Request, response: Response, next: NextFunction) {
  const authHeader= request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Unauthorized' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return response.status(401).json({ message: 'Token error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return response.status(401).json({ message: 'Token malformatted' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return response.status(401).json({ message: 'Token invalid' });
    }
  
    request.body.userId = decoded.id;
    return next();
  });

}