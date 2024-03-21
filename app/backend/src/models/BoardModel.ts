import { IBoard } from '../Interfaces/board/IBoard';
import SequelizeMatches from '../database/models/MatchesModel';
import { IBoardModel } from '../Interfaces/board/IBoardModel';
import SequelizeTeams from '../database/models/TeamsModel';
import { boardTransform, boardTransformAway, boardTransformHome } from '../utils/boardTransform';

export default class BoardModel implements IBoardModel<IBoard> {
  private modelMatches = SequelizeMatches;
  private modelTeams = SequelizeTeams;

  async findAllHome(): Promise<IBoard[]> {
    const teams = await this.modelTeams.findAll();
    const matches = await this.modelMatches.findAll({
      where: { inProgress: false },
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const board = teams.map((team) => boardTransformHome(team, matches));
    return board;
  }

  async findAllAway(): Promise<IBoard[]> {
    const teams = await this.modelTeams.findAll();
    const matches = await this.modelMatches.findAll({
      where: { inProgress: false },
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const board = teams.map((team) => boardTransformAway(team, matches));
    return board;
  }

  async findAll(): Promise<IBoard[]> {
    const teams = await this.modelTeams.findAll();
    const matches = await this.modelMatches.findAll({
      where: { inProgress: false },
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    const board = teams.map((team) => boardTransform(team, matches));
    return board;
  }
}
