import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import UsersModel from '../models/UserModel';
import { IUserRole, IUserToken, IUsers } from '../Interfaces/users/IUsers';
import { IUsersModel } from '../Interfaces/users/IUsersModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class LoginService {
  constructor(
    private teams: IUsersModel<IUsers> = new UsersModel(),
  ) { }

  public async validation(email: string, password: string): Promise<ServiceResponse<IUserToken>> {
    const user = await this.teams.validation(email);
    if (!user) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    const secret = process.env.JWT_SECRET ?? 'secret';
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });
    return { status: 'success', data: { token } };
  }

  public role = async (authorization: string): Promise<ServiceResponse<IUserRole>> => {
    try {
      const [, token] = authorization.split(' ');
      const secret = process.env.JWT_SECRET ?? 'secret';
      const payload = jwt.verify(token, secret);
      const { role } = payload as IUsers;
      return { status: 'success', data: { role } };
    } catch (error) {
      return { status: 'unauthorized', data: { message: 'Token must be a valid token' } };
    }
  };
}
