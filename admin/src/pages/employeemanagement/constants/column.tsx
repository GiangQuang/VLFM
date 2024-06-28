
import type { ProColumns } from '@ant-design/pro-components';

export const column: ProColumns<any>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },
  {
    title: 'Mã dự phòng',
    dataIndex: 'employeeID',
  },
  {
    title: 'Tên nhân viên',
    dataIndex: 'employeename',
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phonenumber',
  },
  {
    title: 'Ngày sinh',
    dataIndex: 'dateofbirth',
    valueType: 'date',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
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
];
