import { Identifiable } from '..';

export interface IMatches extends Identifiable {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchesUpdateFinish {
  message: 'Finished',
}

export interface IMatchesUpdateParams {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchesParams {
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  awayTeamId: number,
}
