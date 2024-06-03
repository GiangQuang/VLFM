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
    dataIndex: 'providerID',
  },
  {
    title: 'Tên nhà cung cấp',
    dataIndex: 'providername',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
