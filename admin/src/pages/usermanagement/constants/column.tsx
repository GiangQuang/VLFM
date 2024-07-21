
import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAllemployee, getAllrole, } from '../service';
import Cookies from "js-cookie";


const getname = Cookies.getCookies("employeename");
export const column: ProColumns<TableListItem>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },

  {
    title: 'Tên nhân viên',
    dataIndex: ['employeeID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllemployee();
      return res.data.map((item) => {
        return { label: `${item?.employeename}`, value: item?.employeeID };
      });
    },
  },
  {
    title: 'Tên tài khoản',
    dataIndex: 'username',
  },
  {
    title: 'Role',
    dataIndex: ['roleId'],
    valueType: 'select',
    request: async () => {
      const res = await getAllrole();
      return res.data.map((item) => {
        return { label: `${item?.rolename}`, value: item?.roleId };
      });
    },
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
