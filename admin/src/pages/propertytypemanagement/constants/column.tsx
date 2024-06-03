
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
    dataIndex: 'propTypeID',
  },
  {
    title: 'Tên loại',
    dataIndex: 'propTypename',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
