import { request } from "@umijs/max";
import { getAllpropType } from "../service";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [

      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'propertyID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mã số',
        dataIndex: 'propertycode',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mã loại tài sản',
        dataIndex: ['propTypeID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllpropType();
          return res.data.map((item) => {
            return {label:`${item?.propTypeID} - ${item?.propTypename} `, value: item?.propTypeID}
          });
        },
      },
      {
        title: 'Tên tài sản',
        dataIndex: 'propertyname',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Đơn vị tính',
        dataIndex: 'unit',
        colProps: {
          xs: 24,
          md: 10,
        },
      },
      {
        title: 'Ghi chú',
        dataIndex: 'note',
        colProps: {
          xs: 24,
          md: 10,
        },
      },
    ],
  },
];
