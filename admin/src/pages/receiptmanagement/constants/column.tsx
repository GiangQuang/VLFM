import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAllemployee, getAllprovider } from '../service';
export const column: ProColumns<TableListItem>[] = [
  {

    title: 'STT',
    dataIndex: 'index',
    valueType: 'index',
  },
  {
    title: 'Mã dự phòng',
    dataIndex: 'receiptID',
  },
  {
    title: 'Ngày nhập',
    dataIndex: 'date',
    valueType: 'date',
  },
  {
    title: 'Tên nhân viên',
    dataIndex: ['employeeID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllemployee();
      return res.data.map((item) => {
        return {label:`${item?.employeename} `, value: item?.employeeID}
      });
    },
  },
  {
    title: 'Nhà cung cấp',
    dataIndex: ['providerID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllprovider();
      return res.data.map((item) => {
        return {label:`${item?.providername} `, value: item?.providerID}
      });
    },
  },
  {
    title: 'Số hoá đơn',
    dataIndex: 'receiptcode',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
