import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAlldeviceassignment, getAllemployee, getAllstatus } from '../service';
export const column: ProColumns<TableListItem>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },
  {
    title: 'Mã dự phòng',
    dataIndex: 'deviceReturnID',
  },
  {
    title: 'Ngày trả',
    dataIndex: 'returnAt',
    valueType: 'date',
  },
  {
    title: 'Nhân viên thực hiện trả',
    dataIndex: ['employeeReturnID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllemployee();
      return res.data.map((item) => {
        return { label: `${item?.employeename}`, value: item?.employeeID };
      });
    },
  },
  {
    title: 'Mã phiếu cấp thiết bị',
    dataIndex: ['deviceAssignmentID'],
    valueType: 'select',
    request: async () => {
      const res = await getAlldeviceassignment();
      return res.data.map((item) => {
        return { label: `${item?.deviceAssignmentID}`, value: item?.deviceAssignmentID };
      });
    },
  },
  
  {
    title: 'Trạng thái lúc trả',
    dataIndex: 'statusID',
    valueType: 'select',
    valueEnum: {
      0: {
        text: 'Bình thường',
      },
      1: {
        text: 'Hỏng',
      },
      2: {
        text: 'Mất',
      },
      3: {
        text: 'Đã hết hạn sử dụng',
      },
    },
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
