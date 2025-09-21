export interface RoleCreateResponse {
  id: number;
  name: string;
  description: string;
  accountId: number;
  permissions: Permission[];
}

export interface Permission {
  id: number;
  name: string;
}
