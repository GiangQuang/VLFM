import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAllproperty, getAllreceipt } from '../service';
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
    title: 'Tên tài sản',
    dataIndex: ['propertyID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllproperty();
      return res.data.map((item) => {
        return {label:`${item?.propertyname}`, value: item?.propertyID}
      });
    },
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
];
