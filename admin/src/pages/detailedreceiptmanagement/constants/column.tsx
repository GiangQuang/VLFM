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
    dataIndex: 'dtReceiptID',
  },
  {
    title: 'Mã hoá đơn nhập',
    dataIndex: ['receiptID'],
  },
  {
    title: 'Mã tài sản',
    dataIndex: ['propertyID'],
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
  },
  {
    title: 'Đơn giá',
    dataIndex: 'price',
  },
  {
    title: 'Nhãn hiệu',
    dataIndex: 'brand',
  },
  {
    title: 'Ngày bắt đầu bảo hành',
    dataIndex: 'warrantydayAt',
    valueType: 'date',
  },
  {
    title: 'Mã hết bảo hành',
    dataIndex: 'warrantydayEnd',
    valueType: 'date',
  },
  {
    title: 'Mã trạng thái',
    dataIndex: ['statusID'],
  },
  {
    title: 'Mã đề xuất',
    dataIndex: ['proposeID'],
  },
];
