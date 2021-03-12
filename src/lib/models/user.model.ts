export interface Roles {
  faculty?: boolean;
  hod?: boolean;
  examCell?: boolean;
  student?: boolean;
}

export interface User {
  name: string;
  rollNumber?: string | undefined;
  email: string;
  roles: Roles;
}
