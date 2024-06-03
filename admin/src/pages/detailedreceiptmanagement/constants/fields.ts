import { request } from "@umijs/max";
import { getAllproperty, getAllpropose, getAllreceipt, getAllstatus } from "../service";

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
        title: 'Mã hoá đơn nhập',
        dataIndex: ['receiptID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllreceipt();
          return res.data.map((item) => {
            return {label:`${item?.receiptID}`, value: item?.receiptID}
          });
        },
      },
      {
        title: 'Mã tài sản',
        dataIndex: ['propertyID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllproperty();
          return res.data.map((item) => {
            return {label:`${item?.propertyID} - ${item?.propertyname} `, value: item?.propertyID}
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
      {
        title: 'Ngày bắt đầu bảo hành',
        dataIndex: 'warrantydayAt',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mã hết bảo hành',
        dataIndex: 'warrantydayEnd',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mã trạng thái',
        dataIndex: ['statusID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllstatus();
          return res.data.map((item) => {
            return {label:`${item?.statusID} - ${item?.statusname} `, value: item?.statusID}
          });
        },
      },
      {
        title: 'Mã đề xuất',
        dataIndex: ['proposeID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllpropose();
          return res.data.map((item) => {
            return {label:`${item?.proposeID} - ${item?.proposename} `, value: item?.proposeID}
          });
        },
      },
    ],
  },
];
