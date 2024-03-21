import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import httpMap from '../utils/httpMap';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async findAll(req: Request, res: Response) {
    const inProgressParam = req.query.inProgress;
    let inProgress: boolean | undefined;
    if (typeof inProgressParam === 'string') {
      inProgress = inProgressParam === 'true';
    }
    const { status, data } = await this.matchesService.findAll(inProgress);
    return res.status(httpMap(status)).json(data);
  }

  public async updateFinish(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.updateFinish(id);
    return res.status(httpMap(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchesService.updateMatch({
      id: Number(id), homeTeamGoals, awayTeamGoals });
    return res.status(httpMap(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { status, data } = await this.matchesService.createMatch(req.body);
    return res.status(httpMap(status)).json(data);
  }
}
