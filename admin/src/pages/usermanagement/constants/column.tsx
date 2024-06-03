
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
    title: 'Mã nhân viên',
    dataIndex: ['employeeID'],
  },
  {
    title: 'Tên tài khoản',
    dataIndex: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    valueEnum: {
      0: {
        text: 'Đang làm việc',
      },
      1: {
        text: 'Đã nghỉ',
      },
    },
    
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
