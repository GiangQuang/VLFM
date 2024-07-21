import { request } from "@umijs/max";
import { getAllprovider, getAllemployee } from "../service";

export const fields = (id, form) => [
  {
    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'receiptID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Ngày nhập',
        dataIndex: 'date',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn ngày nhập!',
            },
          ],
        },
      },
      {
        title: 'Tên nhân viên',
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
              message: 'Vui lòng chọn nhân viên!',
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
        title: 'Nhà cung cấp',
        type: 'select',
        dataIndex: ['providerID'],
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn nhà cung cấp!',
            },
          ],
        },
        request: async () => {
          const res = await getAllprovider();
          return res.data.map((item) => ({
            label: `${item?.providerID} - ${item?.providername}`,
            value: item?.providerID,
          }));
        },
      },
      {
        title: 'Số hoá đơn',
        dataIndex: 'receiptcode',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập số hoá đơn!',
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
