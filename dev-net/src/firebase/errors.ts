import { AuthErrorCodes } from 'firebase/auth';

/**
 * Takes the error code from Firebase and returns string, that can be shown to user
 *
 * @param code - error code from firebase
 * @returns user-friendly string to output
 */
export const takeAuthError = (code: string): string | null => {
  switch (code) {
    case AuthErrorCodes.USER_DELETED:
      return 'user does not exist';
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'wrong email or password';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'wrong email or password';
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'email already exists';
    case AuthErrorCodes.CORS_UNSUPPORTED:
      return 'CORS operations unsupported';
    case AuthErrorCodes.USER_DISABLED:
      return 'user disabled';
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      return 'too many attempts, try later';
    default:
      return null;
  }
};
