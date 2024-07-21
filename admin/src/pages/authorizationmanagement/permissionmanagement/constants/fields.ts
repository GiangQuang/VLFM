

export const fields = () => [
  {

    valueType: 'group',
    columns: [
      {
        title: 'Tên chức năng',
        dataIndex: 'permissionname',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên chức năng!',
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: 'Chỉ cho phép nhập ký tự!',
            },
          ],
        },
      },
      {
        title: 'Ký hiệu',
        dataIndex: 'permissionsymbol',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập ký hiệu!',
            },
            {
              pattern: /^[a-zA-Z]+$/,
              message: 'Chỉ cho phép nhập ký tự!',
            },
          ],
        },
      },
    ],
  },
];
