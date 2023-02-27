export interface UserData {
  id?: string;
  documentType?: string;
  documentNumber?: string;
  name?: string;
  lastName?: string;
  email?: string;
  roles: Role;
}
export interface Role {
  name?: string;
}
