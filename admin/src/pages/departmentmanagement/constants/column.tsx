
import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAllBranch } from '../service';


export const column: ProColumns<TableListItem>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },

  {
    title: 'Mã dự phòng',
    dataIndex: 'deptID',
  },
  {
    title: 'Tên cơ sở',
    dataIndex: ['branchID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllBranch();
      return res.data.map((item) => {
        return { label: `${item?.branchname}`, value: item?.branchID };
      });
    },
  },
  {
    title: 'Tên bộ phận',
    dataIndex: 'deptname',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
