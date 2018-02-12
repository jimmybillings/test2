import { Features } from './feature.interface';
import { UserPreferences } from './user-preferences.interface';
import { User } from './user.interface';

export interface Credentials {
  password: string;
  userId: string;
}

export interface Token {
  expireInSeconds: number;
  token: string;
  tokenType: string;
}

export interface Session {
  user: User;
  siteFeatures: Features;
  token: Token;
  userPreferences: UserPreferences;
  documentsRequiringAgreement?: string[];
}
