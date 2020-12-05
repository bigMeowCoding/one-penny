export interface User {
  name: string;
  age: number;
}
export interface Book {
  name: string;
}
export interface State {
  users: User[];
  books: Book[];
}
export interface Action<T = any> {
  type: string;
  payload?: T;
}
