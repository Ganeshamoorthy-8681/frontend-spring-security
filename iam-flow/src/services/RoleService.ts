import type { RoleCreateRequest } from '../models/request/RoleCreateRequest';
import type { RoleResponse as RoleResponse } from '../models/response/RoleResponse';
import apiClient from './ApiClient';
import type { ListQueryParams } from '../models/common/StandardTypes';
import { UrlUtils } from '../utils/UrlUtils';

/**
 * Role Service
 * Handles role management operations (CRUD operations for roles)
 */
export class RoleService {

  async create(accountId: number, request: RoleCreateRequest): Promise<RoleResponse> {
    const response = await apiClient.post<RoleResponse>(
      `/api/v1/accounts/${accountId}/roles`,
      request
    );
    return response.data;
  }

  async getById(accountId: number, id: number): Promise<RoleResponse> {
    const response = await apiClient.get<RoleResponse>(
      `/api/v1/accounts/${accountId}/roles/${id}`
    );
    return response.data;
  }


  async update(accountId: number, id: number, request: Partial<RoleCreateRequest>): Promise<RoleResponse> {
    const response = await apiClient.put<RoleResponse>(
      `/api/v1/accounts/${accountId}/roles/${id}`,
      request
    );
    return response.data;
  }

  async delete(accountId: number, id: number): Promise<void> {
    await apiClient.delete<void>(
      `/api/v1/accounts/${accountId}/roles/${id}`
    );
  }

  async list(accountId: number, params?: ListQueryParams): Promise<RoleResponse[]> {
    const url = UrlUtils.buildUrl<ListQueryParams>(
      `/api/v1/accounts/${accountId}/roles/list`,
      params
    );
    const response = await apiClient.get<RoleResponse[]>(url);
    return response.data;
  }
}
