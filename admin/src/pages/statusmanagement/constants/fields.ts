

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [
      
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'statusID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Tên trạng thái',
        dataIndex: 'statusname',
        colProps: {
          xs: 24,
          md: 6,
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
