import { request } from "@umijs/max";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [
      
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'proposeID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Tên đề xuất',
        dataIndex: 'proposename',
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
