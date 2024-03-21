import MatchesModel from '../models/MatchesModel';
import { IMatches, IMatchesParams, IMatchesUpdateFinish,
  IMatchesUpdateParams } from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMachesModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private matches: IMatchesModel<IMatches> = new MatchesModel(),
  ) { }

  public async findAll(inProgress?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.matches.findAll(inProgress);
    return { status: 'success', data: allMatches };
  }

  public async updateFinish(id: string): Promise<ServiceResponse<IMatchesUpdateFinish>> {
    await this.matches.updateFinish(Number(id));
    return { status: 'success', data: { message: 'Finished' } };
  }

  public async updateMatch({ id, homeTeamGoals, awayTeamGoals }: IMatchesUpdateParams):
  Promise<ServiceResponse<IMatchesUpdateParams>> {
    await this.matches.updateMatch({ id, homeTeamGoals, awayTeamGoals });
    return { status: 'success', data: { id, homeTeamGoals, awayTeamGoals } };
  }

  public async createMatch(match: IMatchesParams): Promise<ServiceResponse<IMatches>> {
    const newMatch = await this.matches.createMatch(match);
    return { status: 'created', data: newMatch };
  }
}
