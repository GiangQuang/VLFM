import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAllrole, getAllpermission} from '../service';

export const column: ProColumns<TableListItem>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },
  {
    title: 'Tên quyền',
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
    title: 'Tên chức năng',
    dataIndex: ['permissionId'],
    valueType: 'select',
    request: async () => {
      const res = await getAllpermission();
      return res.data.map((item) => {
        return { label: `${item?.permissionname}`, value: item?.permissionId };
      });
    },
  },
  {
    title: 'Đường dẫn',
    dataIndex: 'accessURL',
  },
  {
    title: 'Ký hiệu',
    dataIndex: 'permissionsymbol',
  },
  {
    title: 'Mã đường dẫn',
    dataIndex: 'permissionURL',
  },
];
