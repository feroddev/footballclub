import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

class AuthMiddleware {
  static token(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const [,token] = authorization.split(' ');
      const secret = process.env.JWT_SECRET ?? 'secret';
      const claims = jwt.verify(token, secret);
      res.locals.user = claims;
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}

export default AuthMiddleware;
