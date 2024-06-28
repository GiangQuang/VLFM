// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { TableListItem } from './data';

/** Get a list of leads GET /api/lead */
export async function getAll(
  params: {
    // query
    /** Current page number */
    current?: number;
    /** page size */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    /** The total number of items in the list */
    total?: number;
    success?: boolean;
  }>('api/role/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** New lead PUT /api/lead */
export async function updateOne(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(`api/role/${data?.roleId}`, {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** New lead POST /api/lead */
export async function addOne(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('api/role', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** delete lead DELETE /api/lead */
export async function removeMany(data: any, options?: any ) {
  return request<Record<string, any>>('api/role', {
    data,
    method: 'DELETE',
    ...(options || {}),
  });
}

export async function convertOpp(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/lead-admin/convert/oppotunity', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function updateStatus(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/lead-admin/all/update-status', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function assignMany(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/lead-admin/assign/many', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function assignManyNutritional(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('http://localhost:5051/api/item-admin/update/many/nutritional', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function uploadFile(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/lead-import-admin/upload-file', {
    data,
    method: 'POST',
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export async function importData(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/lead-import-admin/import', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}
export async function importOne(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('/api/lead-import-admin/import-one', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

export async function getById(id: string): Promise<{ data: [] }> {
  return request(`api/role/${id}`);
}