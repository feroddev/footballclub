import { IMatches, IMatchesParams, IMatchesUpdateParams } from './IMatches';

export interface IMatchesModel<T> {
  findAll(inProgress?: boolean): Promise<T[]>
  updateFinish(id: number): Promise<void>
  createMatch(match: IMatchesParams): Promise<IMatches>
  updateMatch({ id, homeTeamGoals, awayTeamGoals }: IMatchesUpdateParams): Promise<void>
}
