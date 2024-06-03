import { request } from "@umijs/max";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã cơ sở',
        dataIndex: 'branchID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Tên cơ sở',
        dataIndex: 'branchname',
        colProps: {
          xs: 24,
          md: 6,
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
    ],
  },
];
