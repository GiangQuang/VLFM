import { ACTIVE_TYPE_OPTIONS, STATUS_TYPE_OPTIONS } from '@/helper/constants';
import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { Space, Tag, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const column: ProColumns<TableListItem>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },

  {
    title: 'Mã dự phòng',
    dataIndex: 'branchID',
  },
  {
    title: 'Tên cơ sở',
    dataIndex: 'branchname',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
  },
];
