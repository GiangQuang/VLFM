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
    dataIndex: 'proposeID',
  },
  {
    title: 'Tên đề xuất',
    dataIndex: 'proposename',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
