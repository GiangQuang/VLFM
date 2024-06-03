import { getAllemployee } from '../service';

export const fields = (id, form) => [
  {
    valueType: 'group',
    columns: [
      {
        title: 'Mã nhân viên ',
        type: 'select',
        dataIndex: ['employeeID'],
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllemployee();
          return res.data.map((item) => {
            return {label:`${item?.employeeID} - ${item?.employeename} `, value: item?.employeeID}
          });
        },
      },
      {
        title: 'Tên tài khoản',
        dataIndex: 'username',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mật khẩu',
        dataIndex: 'password',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Role',
        dataIndex: 'role',
        request: async () => {
          return [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
          ];
        },
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        // hideInForm: true,
        title: 'Trạng thái',
        dataIndex: 'status',
        request: async () => {
          return [
            { label: 'Đang làm việc', value: 0 },
            { label: 'Đã nghỉ', value: 1 },
          ];
        },
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
    ],
  },
];
