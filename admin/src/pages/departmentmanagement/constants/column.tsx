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
    dataIndex: 'deptID',
  },
  {
    title: 'Mã cơ sở',
    dataIndex: 'branchID',
  },
  {
    title: 'Tên bộ phận',
    dataIndex: 'deptname',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
  // {
  //   title: 'Giá',
  //   dataIndex: 'ots_price',
  //   valueType:'money'
  // },
  // {
  //   title: 'VAT (%)',

  //   dataIndex: 'Vat_Tax_Rate',
  //   render: (_, record) => (
  //     <Space>
  //       <span>{record?.pos_id?.[0]?.Vat_Tax_Rate}</span>
  //     </Space>
  //   ),
  // },
  // {
  //   title: 'Nhóm món',
  //   dataIndex: ['type_id'],
  //   render: (_, record) => (
  //     <Space>
  //       <span>{record?.type_id?.[0]?.name}</span>
  //     </Space>
  //   ),
  // },
  // {
  //   title: 'Trạng thái',
  //   dataIndex: 'status',
  //   render: (_, record) => (
  //     <Space>
  //       {record?.status === "ACTIVE" ? <Tag color="green">Active</Tag> : <Tag color="red">Closed</Tag>}
  //       {/* {record.labels.map(({ name, color }) => (
  //               <Tag color={color} key={name}>
  //                 {name}
  //               </Tag>
  //             ))} */}
  //     </Space>
  //   ),
  // },
  // {
  //   title: 'Nhóm món',
  //   dataIndex: 'Expiry_Date',
  // },
];
