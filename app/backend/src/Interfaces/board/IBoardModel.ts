export interface IBoardModel<T> {
  findAllHome(): Promise<T[]>
  findAllAway(): Promise<T[]>
  findAll(): Promise<T[]>
}
