import { Request, Router, Response } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/', (req: Request, res: Response) => teamsController.findAll(req, res));
teamsRouter.get('/:id', (req: Request, res: Response) => teamsController.findById(req, res));

export default teamsRouter;
