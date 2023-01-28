import { User } from 'firebase/auth';

export const takeUserName = (user: User) => {
  return user?.displayName || user?.email?.split('@')[0] || 'Unknown';
};
