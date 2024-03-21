import { sortBoard } from '../utils/boardTransform';
import { IBoard } from '../Interfaces/board/IBoard';
import BoardModel from '../models/BoardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IBoardModel } from '../Interfaces/board/IBoardModel';

export default class BoardService {
  constructor(
    private board: IBoardModel<IBoard> = new BoardModel(),
  ) { }

  public async findAllHome(): Promise<ServiceResponse<IBoard[]>> {
    const allHomeTeams = await this.board.findAllHome();
    const sortHomeTeams = sortBoard(allHomeTeams);
    return { status: 'success', data: sortHomeTeams };
  }

  public async findAllAway(): Promise<ServiceResponse<IBoard[]>> {
    const allAwayTeams = await this.board.findAllAway();
    const sortAwayTeams = sortBoard(allAwayTeams);
    return { status: 'success', data: sortAwayTeams };
  }

  public async findAll(): Promise<ServiceResponse<IBoard[]>> {
    const allTeams = await this.board.findAll();
    const sortTeams = sortBoard(allTeams);
    return { status: 'success', data: sortTeams };
  }
}
