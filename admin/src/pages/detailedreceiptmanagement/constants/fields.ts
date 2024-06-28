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
        // fieldProps:{
        //   mode: 'search',
        // },
        valueType: 'select',
        request: async () => {
          const res = await getAllreceipt();
          return res.data.map((item) => {
            return { label: `${item?.receiptID} - ${item?.receiptcode}`, value: item?.receiptID };
          });
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
        request: async () => {
          const res = await getAllproperty();
          return res.data.map((item) => {
            return {
              label: `${item?.propertyname}`,
              value: item?.propertyID,
            };
          });
        },
      },
      {
        title: 'Số lượng',
        dataIndex: 'quantity',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Đơn giá',
        dataIndex: 'price',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Nhãn hiệu',
        dataIndex: 'brand',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
    ],
  },
];
