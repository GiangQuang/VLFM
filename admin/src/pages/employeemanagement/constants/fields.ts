import { rule } from "@/services/ant-design-pro/api";
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
        formItemProps: {
          rules: [
            {
              required: true,
              pattern: /^[a-zA-Z\s]+$/,
              message: 'Vui lòng nhập tên nhân viên hợp lệ! (Chỉ chứa chữ cái và khoảng trắng)',
            },
          ],
        },
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phonenumber',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              pattern: /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/,
              message: 'Vui lòng nhập số điện thoại hợp lệ! (Bắt đầu với +84 0 và đủ 10 số)',
            },
          ],
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
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập ngày sinh!',
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
      {
        initialValue: 0,
        title: 'Trạng thái',
        dataIndex: 'status',
        request: async () => {
          return [{ label: 'Đang làm việc', value: 0 }, { label: 'Đã nghỉ', value: 1 }];
        },
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
      },
    ],
  },
];
