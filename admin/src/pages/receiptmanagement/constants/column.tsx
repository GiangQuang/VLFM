import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
export const column: ProColumns<TableListItem>[] = [
  {

    title: 'STT',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: 'Mã dự phòng',
    dataIndex: 'receiptID',
  },
  {
    title: 'Ngày nhập',
    dataIndex: 'date',
    valueType: 'date',
  },
  {
    title: 'Mã nhân viên',
    dataIndex: ['employeeID'],
  },
  {
    title: 'Mã nhà cung cấp',
    dataIndex: ['providerID'],
  },
  {
    title: 'Số hoá đơn',
    dataIndex: 'receiptcode',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
