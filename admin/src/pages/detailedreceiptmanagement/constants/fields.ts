import { getAllproperty, getAllreceipt } from '../service';

export const fields = (id, form) => [
  {
    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'dtReceiptID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mã hoá đơn nhập - số hoá đơn',
        showSearch: true,
        dataIndex: ['receiptID'],
        colProps: {
          xs: 24,
          md: 6,
        },
        valueType: 'select',
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn mã hoá đơn nhập - số hoá đơn!',
            },
          ],
        },
        request: async () => {
          const res = await getAllreceipt();
          return res.data.map((item) => ({
            label: `${item?.receiptID} - ${item?.receiptcode}`,
            value: item?.receiptID,
          }));
        },
      },
      {
        title: 'Tên tài sản',
        dataIndex: ['propertyID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 10,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn tên tài sản!',
            },
          ],
        },
        request: async () => {
          const res = await getAllproperty();
          return res.data.map((item) => ({
            label: `${item?.propertyname}`,
            value: item?.propertyID,
          }));
        },
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantity',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập số lượng!',
            },
            {
              pattern: /^[0-9]*$/,
              message: 'Vui lòng chỉ nhập số!',
            },
          ],
        },
      },
      {
        title: 'Đơn giá',
        dataIndex: 'price',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đơn giá!',
            },
            {
              pattern: /^[0-9]*$/,
              message: 'Vui lòng chỉ nhập số!',
            },
          ],
        },
      },
      {
        title: 'Nhãn hiệu',
        dataIndex: 'brand',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true, 
              message: 'Vui lòng nhập nhãn hiệu!',
            },
          ],
        },
      },
    ],
  },
];
