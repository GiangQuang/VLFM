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
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập mã số!',
            },
            {
              pattern: /^[0-9]*$/,
              message: 'Vui lòng chỉ nhập số!',
            },
          ],
        },
      },
      {
        title: 'Loại tài sản',
        dataIndex: ['propTypeID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn loại tài sản!',
            },
          ],
        },
        request: async () => {
          const res = await getAllpropType();
          return res.data.map((item) => ({
            label: `${item?.propTypeID} - ${item?.propTypename}`,
            value: item?.propTypeID,
          }));
        },
      },
      {
        title: 'Tên tài sản',
        dataIndex: 'propertyname',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên tài sản!',
            },
          ],
        },
      },
      {
        title: 'Đơn vị tính',
        dataIndex: 'unit',
        colProps: {
          xs: 24,
          md: 10,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đơn vị tính!',
            },
            {
              pattern: /^[0-9]*$/,
              message: 'Vui lòng chỉ nhập số!',
            },
          ],
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
