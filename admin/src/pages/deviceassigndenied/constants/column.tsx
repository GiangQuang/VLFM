import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAlldepartment, getAllemployee, getAllpropertyimport, getAllstatus } from '../service';
import { getAllproperty } from '@/pages/propertyimportmanagement/service';
export const column: ProColumns<TableListItem>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: 'Mã phiếu',
    dataIndex: 'deviceAssignmentID',
  },

  {
    hideInTable: true,
    hideInSearch: true,
    title: 'Ngày cấp',
    dataIndex: 'assignAt',
    valueType: 'date',
  },
  {
    hideInTable: true,
    hideInSearch: true,
    title: 'Nhân viên cấp',
    dataIndex: ['employeeAssignID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllemployee();
      return res.data.map((item) => {
        return { label: `${item?.employeename}`, value: item?.employeeID };
      });
    },
  },
  {
    hideInTable: true,
    hideInSearch: true,
    title: 'Tên thiết bị',
    dataIndex: ['propImportID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllpropertyimport();

      const PropertyData = await getAllproperty();

      const data = res.data.map((item) => {
        const property = PropertyData.data.find((property) => property.propertyID === item.propertyID);
        return {label: `${property?.propertyname}`, value: item?.propImportID};
      });

      return data; 
    },
  },
  {
    title: 'Nhân viên được cấp',
    dataIndex: ['employeeReceiveID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllemployee();
      return res.data.map((item) => {
        return { label: `${item?.employeename}`, value: item?.employeeID };
      });
    },
  },
  {
    title: 'Tên bộ phận',
    dataIndex: ['deptID'],
    valueType: 'select',
    request: async () => {
      const res = await getAlldepartment();
      return res.data.map((item) => {
        return { label: `${item?.deptname}`, value: item?.deptID };
      });
    },
  },
  {
    hideInTable: true,
    hideInSearch: true,
    title: 'Trạng thái lúc cấp',
    dataIndex: ['statusID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllstatus();
      return res.data.map((item) => {
        return { label: `${item?.statusname}`, value: item?.statusID };
      });
    },
  },
  {
    hideInTable: true,
    hideInSearch: true,
    title: 'Ngày hết hạn cấp',
    dataIndex: 'assignEnd',
    valueType: 'date',
  },
  {

    title: 'Ngày tạo đề xuất',
    dataIndex: 'proposeAt',
    valueType: 'date',
  },
  {

    title: 'Nội dung từ chối',
    dataIndex: 'proposeContent',
  },
  {
    title: 'Trạng thái đề xuất',
    dataIndex: 'proposeStatus',
    valueEnum: {
      0: {
        text: 'Đang chờ duyệt',
      },
      1: {
        text: 'Đồng ý',
      },
      2: {
        text: 'Từ chối',
      },
    },
  },
  {
    hideInSearch: true,
    hideInTable: true,
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
