import { getAllemployee, getAllrole } from '../service';

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
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn mã nhân viên!',
            },
          ],
        },
        request: async () => {
          const res = await getAllemployee();
          return res.data.map((item) => ({
            label: `${item?.employeeID} - ${item?.employeename}`,
            value: item?.employeeID,
          }));
        },
      },
      {
        title: 'Tên tài khoản',
        dataIndex: 'username',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên tài khoản!',
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: 'Chỉ cho phép nhập ký tự hoặc số!',
            },
          ],
        },
      },
      {
        title: 'Mật khẩu',
        dataIndex: 'password',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu!',
            },
          ],
        },
      },
      {
        title: 'Role',
        dataIndex: ['roleId'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn role!',
            },
          ],
        },
        request: async () => {
          const res = await getAllrole();
          return res.data.map((item) => ({
            label: `${item?.rolename}`,
            value: item?.roleId,
          }));
        },
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn trạng thái!',
            },
          ],
        },
        initialValue: 0,
        request: async () => {
          return [
            { label: 'Đang làm việc', value: 0 },
            { label: 'Đã nghỉ', value: 1 },
          ];
        },
      },
    ],
  },
];
