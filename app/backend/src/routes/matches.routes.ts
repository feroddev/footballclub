import { Request, Router, Response } from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import MatchesController from '../controller/MatchesController';
import Validations from '../middlewares/validationLogin';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get(
  '/',
  (req: Request, res: Response) => matchesController.findAll(req, res),
);

matchesRouter.post(
  '/',
  AuthMiddleware.token,
  Validations.validateMatch,
  Validations.validateTeams,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

matchesRouter.patch(
  '/:id',
  AuthMiddleware.token,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);

matchesRouter.patch(
  '/:id/finish',
  AuthMiddleware.token,
  (req: Request, res: Response) => matchesController.updateFinish(req, res),
);

export default matchesRouter;
