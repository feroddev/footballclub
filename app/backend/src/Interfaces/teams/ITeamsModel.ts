export interface ITeamsModel<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
}
