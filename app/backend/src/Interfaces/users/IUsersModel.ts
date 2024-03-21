export interface IUsersModel<T> {
  validation(email: string): Promise<T | null>;
}
