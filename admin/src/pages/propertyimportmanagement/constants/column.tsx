import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAllproperty } from '../service';
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
    title: 'Mã hoá đơn nhập chi tiết',
    dataIndex: ['dtReceiptID'],
  },
  {
    title: 'Tên tài sản',
    dataIndex: ['propertyID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllproperty();
      return res.data.map((item) => {
        return { label: `${item?.propertyname} `, value: item?.propertyID };
      });
    },
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
    title: 'Trạng thái',
    dataIndex: 'statusID',
    valueType: 'select',
    valueEnum: {
      0: {
        text: 'Đang sử dụng',
      },
      1: {
        text: 'Hỏng',
      },
      2: {
        text: 'Chưa sử dụng',
      },
      3: {
        text: 'Mất',
      },
      4: {
        text: 'Đã hết hạn sử dụng',
      },
    },
  },
];
