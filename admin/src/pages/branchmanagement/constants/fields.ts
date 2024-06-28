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
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên cơ sở!',
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: 'Chỉ cho phép nhập ký tự hoặc số!',
            },
          ],
        },
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        colProps: {
          xs: 24,
          md: 10,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập địa chỉ!',
            },
          ],
        },
      },
    ],
  },
];
