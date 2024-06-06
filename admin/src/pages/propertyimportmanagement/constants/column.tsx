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
    title: 'Mã tài sản nhập',
    dataIndex: 'propImportID',
  },
  {
    title: 'Mã hoá đơn nhập',
    dataIndex: ['dtReceiptID'],
  },
  {
    title: 'Mã tài sản',
    dataIndex: ['propertyID'],
  },
  {
    title: 'Ngày bảo hành',
    dataIndex: 'warrantydayAt',
    valueType: 'date',
  },
  {
    title: 'Ngày hết bảo hành',
    dataIndex: 'warrantydayEnd',
    valueType: 'date',
  },
  {
    title: 'Mã trạng thái',
    dataIndex: ['statusID'],
  },
];
