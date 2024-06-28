import type { ProColumns } from '@ant-design/pro-components';
import { TableListItem } from '../data';
import { getAllpropType } from '../service';


export const column: ProColumns<TableListItem>[] = [
  {
    title: 'STT',
    dataIndex: 'index',
    // valueType: 'indexBorder',
    valueType: 'index',
  },

  {
    title: 'Mã dự phòng',
    dataIndex: 'propertyID',
  },
  {
    title: 'Mã số',
    dataIndex: 'propertycode',
  },
  {
    title: 'Loại tài sản',
    dataIndex: ['propTypeID'],
    valueType: 'select',
    request: async () => {
      const res = await getAllpropType();
      return res.data.map((item) => {
        return {label:`${item?.propTypename} `, value: item?.propTypeID}
      });
    },
  },
  {
    title: 'Tên tài sản',
    dataIndex: 'propertyname',
  },
  {
    title: 'Đơn vị tính',
    dataIndex: 'unit',
  },
  {
    title: 'Ghi chú',
    dataIndex: 'note',
  },
];
