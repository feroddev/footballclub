import { Request, Router, Response } from 'express';
import LoginController from '../controller/LoginController';
import Validations from '../middlewares/validationLogin';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post(
  '/',
  Validations.validateBook,
  (req: Request, res: Response) => loginController.validation(req, res),
);
loginRouter.get('/role', (req: Request, res: Response) => loginController.role(req, res));

export default loginRouter;
