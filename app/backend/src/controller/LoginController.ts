import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import httpMap from '../utils/httpMap';

export default class LoginController {
  constructor(
    private teamService = new LoginService(),
  ) { }

  public async validation(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.teamService.validation(email, password);
    res.status(httpMap(status)).json(data);
  }

  public async role(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const { status, data } = await this.teamService.role(authorization);
    res.status(httpMap(status)).json(data);
  }
}
