import { Role } from '../../enums/role.enum';

export interface User {
  email: string;
  role: Role;
}
