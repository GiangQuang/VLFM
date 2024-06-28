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
    title: 'Tên quyền',
    dataIndex: 'rolename',
  },
];
