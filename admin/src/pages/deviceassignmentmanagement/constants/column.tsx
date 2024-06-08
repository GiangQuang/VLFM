import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
export const column: ProColumns<TableListItem>[] = [
  {

    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },
  {
    title: 'Mã dự phòng',
    dataIndex: 'deviceAssignmentID',
  },
  {
    title: 'Ngày cấp',
    dataIndex: 'assignAt',
    valueType: 'date',
  },
  {
    title: 'Nhân viên cấp',
    dataIndex: ['employeeAssignID'],
  },
  {
    title: 'Mã tài sản nhập',
    dataIndex: ['propImportID'],
  },
  {
    title: 'Nhân viên được cấp',
    dataIndex: ['employeeReceiveID'],
  },
  {
    title: 'Tên bộ phận',
    dataIndex: ['deptID'],
  },
  {
    title: 'Trạng thái lúc cấp',
    dataIndex: ['statusID'],
  },
  {
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
    title: 'Nội dung đề xuất',
    dataIndex: 'proposeContent',
  },
  {
    title: 'Trạng thái đề xuất',
    dataIndex: 'proposeStatus',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
