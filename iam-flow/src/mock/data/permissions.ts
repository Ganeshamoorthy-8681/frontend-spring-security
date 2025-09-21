/**
 * Mock data for permissions
 */

import type { PermissionModel } from "../../models/core/Permission";

export const mockPermissions = [
  // Account Management Permissions
  {id:1,name:"IAM:USER:CREATE", description:"Permission to create users"},
  {id:2,name:"IAM:USER:READ", description:"Permission to read users"},
  {id:3,name:"IAM:USER:UPDATE", description:"Permission to update users"},
  {id:4,name:"IAM:USER:DELETE", description:"Permission to delete users"}
];



/**
 * Helper functions for mock permission operations
 */
export const permissionMockHelpers = {


  getById: (id: number): PermissionModel | undefined => {
    return mockPermissions.find(permission => permission.id === id);
  },


  getAll: (): PermissionModel[] => {
    return [...mockPermissions];
  }

};
