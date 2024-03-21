import SequelizeUser from '../database/models/UsersModel';
import { IUsers } from '../Interfaces/users/IUsers';
import { IUsersModel } from '../Interfaces/users/IUsersModel';

export default class UsersModel implements IUsersModel<IUsers> {
  private model = SequelizeUser;

  async validation(email: string): Promise<IUsers | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return dbData;
  }
}
