export const fields = (id, form) => [
  {
    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'propTypeID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Tên loại',
        dataIndex: 'propTypename',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên loại!',
            },
          ],
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
