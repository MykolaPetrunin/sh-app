import { CurrentUserRes } from '../interfaces/currentUserRes';
import { CurrentUser } from '../interfaces/currentUser';

export const currentUserResToCurrentUser = (sourse: CurrentUserRes): CurrentUser => ({
  email: sourse.email,
  userName: sourse.username,
  isVerified: sourse.is_email_verified,
  id: sourse.id,
});
