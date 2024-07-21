

export const fields = () => [
  {

    valueType: 'group',
    columns: [
      {
        title: 'Tên quyền',
        dataIndex: 'rolename',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên quyền!',
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
