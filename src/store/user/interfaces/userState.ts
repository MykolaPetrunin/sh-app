import { User } from './user';

export interface UserState {
  user?: User;
  loading: boolean;
}
