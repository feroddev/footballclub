import TeamsModel from '../models/TeamsModel';
import { ITeams } from '../Interfaces/teams/ITeams';
import { ITeamsModel } from '../Interfaces/teams/ITeamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teams: ITeamsModel<ITeams> = new TeamsModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teams.findAll();
    return { status: 'success', data: allTeams };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeams | null>> {
    const team = await this.teams.findById(id);
    if (!team) {
      return { status: 'notFound', data: { message: 'Time não encontrado' } };
    }
    return { status: 'success', data: team };
  }
}
