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
  }>('api/property/', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAllpropType(
  // params: {
  //   // query
  //   /** Current page number */
  //   current?: number;
  //   /** page size */
  //   pageSize?: number;
  // },
  // options?: { [key: string]: any },
) {
  return request<{
    data: TableListItem[];
    /** The total number of items in the list */
    total?: number;
    success?: boolean;
  }>('api/propertytype/', {
    method: 'GET',
    // params: {
    //   ...params,
    // },
    // ...(options || {}),
  });
}



/** New lead PUT /api/lead */
export async function updateOne(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>(`api/property/${data?.id}`, {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** New lead POST /api/lead */
export async function addOne(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request<TableListItem>('api/property', {
    data,
    method: 'POST',
    ...(options || {}),
  });
}

/** delete lead DELETE /api/lead */
export async function removeMany(data: any, options?:  any ) {
  return request<Record<string, any>>('api/property', {
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
  return request(`api/property/${id}`);
}

// export async function getHistory(id: string): Promise<{ data: [] }> {
//   return request(`/api/lead-admin/history/${id}`);
// }

// export async function getById(id: string, options?: { [key: string]: any }) {
//   return request<{
//     data: TableListItem[];
//     /** The total number of items in the list */
//     total?: number;
//     success?: boolean;
//   }>(`/api/customer-admin/${id}`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getLegalTypes(options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/legaltype-admin`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getDiplomas(options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/diploma-admin`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getCareers(options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/career-admin`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getLeadSources(options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/source-admin`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getContactTypes(options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/contacttype-admin`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getCities(options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/city-admin`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getDistricts(code: string, options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/district-admin/code/${code}`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }
// export async function getWards(code: string, options?: { [key: string]: any }) {
//   return request<TableListItem>(`/api/ward-admin/code/${code}`, {
//     method: 'GET',
//     ...(options || {}),
//   });
// }

// export async function getNationalities(
//   params: {
//     // query
//     /** Current page number */
//     current?: number;
//     /** page size */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<{
//     data: TableListItem[];
//     /** The total number of items in the list */
//     total?: number;
//     success?: boolean;
//   }>('/api/nationality-admin', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// export async function getAdmins(
//   params: {
//     // query
//     /** Current page number */
//     current?: number;
//     /** page size */
//     pageSize?: number;
//     department_id?: string;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<{
//     data: TableListItem[];
//     /** The total number of items in the list */
//     total?: number;
//     success?: boolean;
//   }>('/api/admin', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// export async function getAdminGroups(
//   params: {
//     // query
//     /** Current page number */
//     current?: number;
//     /** page size */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<{
//     data: TableListItem[];
//     /** The total number of items in the list */
//     total?: number;
//     success?: boolean;
//   }>('/api/adminsgroup-admin', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

// export async function getDepartments(
//   params: {
//     // query
//     /** Current page number */
//     current?: number;
//     /** page size */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<{
//     data: TableListItem[];
//     /** The total number of items in the list */
//     total?: number;
//     success?: boolean;
//   }>('/api/department-admin', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }


// export async function getBusinessTypes(
//   params: {
//     // query
//     /** Current page number */
//     current?: number;
//     /** page size */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<{
//     data: TableListItem[];
//     /** The total number of items in the list */
//     total?: number;
//     success?: boolean;
//   }>('/api/businesstype-admin', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
// export async function getBusinessCategories(
//   params: {
//     // query
//     /** Current page number */
//     current?: number;
//     /** page size */
//     pageSize?: number;
//   },
//   options?: { [key: string]: any },
// ) {
//   return request<{
//     data: TableListItem[];
//     /** The total number of items in the list */
//     total?: number;
//     success?: boolean;
//   }>('/api/businesscategory-admin', {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }