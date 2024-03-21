import { Request, Router, Response } from 'express';
import BoardController from '../controller/BoardController';

const leaderBoardController = new BoardController();

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/',
  (req: Request, res: Response) => leaderBoardController.findAll(req, res),
);

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response) => leaderBoardController.findAllHome(req, res),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response) => leaderBoardController.findAllAway(req, res),
);

export default leaderBoardRouter;
