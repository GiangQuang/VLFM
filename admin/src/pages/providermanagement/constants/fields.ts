import { request } from "@umijs/max";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [
      
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'providerID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Tên nhà cung cấp',
        dataIndex: 'providername',
        colProps: {
          xs: 24,
          md: 10,
        },
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
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
          md: 6,
        },
      },
    ],
  },
];
