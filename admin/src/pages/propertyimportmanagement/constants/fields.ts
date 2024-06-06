import { request } from "@umijs/max";
import { getAlldetailedreceipt, getAllproperty, getAllpropose, getAllreceipt, getAllstatus } from "../service";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã tài sản nhập',
        dataIndex: 'propImportID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mã hoá đơn nhập chi tiết',
        dataIndex: ['dtReceiptID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAlldetailedreceipt();
          return res.data.map((item) => {
            return {label:`${item?.dtReceiptID}`, value: item?.dtReceiptID}
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
        title: 'Ngày bảo hành',
        dataIndex: 'warrantydayAt',
        valueType: 'date',
      },
      {
        title: 'Ngày hết bảo hành',
        dataIndex: 'warrantydayEnd',
        valueType: 'date',
      },
      {
        title: 'Mã trạng thái',
        dataIndex: ['statusID'],
        colProps: {
          xs: 24,
          md: 6,
        },
        type: 'select',
        request: async () => {
          const res = await getAllstatus();
          return res.data.map((item) => {
            return {label:`${item?.statusID} - ${item?.statusname} `, value: item?.statusID}
          });
        },
      },
    ],
  },
];
