import { request } from "@umijs/max";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'employeeid',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Tên nhân viên',
        dataIndex: 'employeename',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phonenumber',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Ngày sinh',
        dataIndex: 'dateofbirth',
        valueType: 'date',
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
      {
        title: 'Trạng thái',
        dataIndex: 'status',
       request: async () => {
        return [{label: 'Đang làm việc', value: 0}, {label: 'Đã nghỉ', value: 1 }]
       },
        type:'select',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
    ],
  },
];
