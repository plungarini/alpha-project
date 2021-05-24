import { UserDetails } from './user-details.model';
import { Roles } from './roles.model';
import { Timestamp } from './timestamp.model';

export class User {
  id?: string;
  name: string;
  email: string;
  disabled: boolean;
  roles: Roles;
  details?: UserDetails;
  stripeId?: string;
  stripeLink?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}
