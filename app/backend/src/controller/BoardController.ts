import { Request, Response } from 'express';
import BoardService from '../services/BoardService';
import httpMap from '../utils/httpMap';

export default class BoardController {
  constructor(
    private boardService = new BoardService(),
  ) { }

  public async findAllHome(_req: Request, res: Response) {
    const { status, data } = await this.boardService.findAllHome();
    res.status(httpMap(status)).json(data);
  }

  public async findAllAway(_req: Request, res: Response) {
    const { status, data } = await this.boardService.findAllAway();
    res.status(httpMap(status)).json(data);
  }

  public async findAll(_req: Request, res: Response) {
    const { status, data } = await this.boardService.findAll();
    res.status(httpMap(status)).json(data);
  }
}
