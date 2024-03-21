import SequelizeMatches from '../database/models/MatchesModel';
import { IMatches, IMatchesUpdateParams } from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMachesModel';

export default class MatchesModel implements IMatchesModel<IMatches> {
  private model = SequelizeMatches;

  async findAll(inProgress?: boolean): Promise<IMatches[]> {
    let dbData = await this.model.findAll({
      include: [
        { association: 'homeTeam', attributes: ['teamName'] },
        { association: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgress !== undefined) {
      dbData = dbData.filter((match) => match.inProgress === inProgress);
    }
    return dbData;
  }

  async updateFinish(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch({ id, homeTeamGoals, awayTeamGoals }: IMatchesUpdateParams): Promise<void> {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(match: IMatches): Promise<IMatches> {
    try {
      const matchData = { ...match, inProgress: true };
      const newMatch = await this.model.create(matchData);
      return newMatch;
    } catch (error) {
      throw new Error('There is no team with such id!');
    }
  }
}
