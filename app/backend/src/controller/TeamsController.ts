import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import httpMap from '../utils/httpMap';

export default class TeamsController {
  constructor(
    private teamService = new TeamsService(),
  ) { }

  public async findAll(_req: Request, res: Response) {
    const { status, data } = await this.teamService.findAll();
    res.status(httpMap(status)).json(data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamService.findById(Number(id));
    res.status(httpMap(status)).json(data);
  }
}
