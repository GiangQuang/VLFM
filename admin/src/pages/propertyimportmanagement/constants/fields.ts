import { getById } from '@/pages/detailedreceiptmanagement/service';
import { getAlldetailedreceipt, getAllproperty, getdetailedreceiptById } from '../service';

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
            return { label: `${item?.dtReceiptID}`, value: item?.dtReceiptID };
          });
        },
      },
      {
        title: 'Mã tài sản',
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
              label: `${item?.propertyID} - ${item?.propertyname} `,
              value: item?.propertyID,
            };
          });
        },
      },
      // {
      //   valueType: 'dependency',
      //   name: ['dtReceiptID'],
      //   columns: ({ dtReceiptID }) => {

      //     return [
      //       {
      //         title: 'Mã tài sản',
      //         dataIndex: 'propertyID',
      //         colProps: {
      //           xs: 24,
      //           md: 9,
      //         },
      //         params: { dtReceiptID },
      //         request: async () => {
      //           const {data} = await getdetailedreceiptById(dtReceiptID);
      //           form.setFieldValue(['propertyID'], data?.propertyID);
      //         return [{label:`${data?.propertyID}`, value: `${data?.propertyID}`}];
      //         },
      //       },
      //     ];
      //   },
      // },
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
        dataIndex: 'statusID',
        colProps: {
          xs: 24,
          md: 6,
        },
        valueType: 'select',
        request: async () => {
          return [
            { label: 'Đang sử dụng', value: 0 },
            { label: 'Hỏng', value: 1 },
            { label: 'Chưa sử dụng', value: 2 },
            { label: 'Mất', value: 3 },
            { label: 'Đã hết hạn sử dụng', value: 4 },
          ];
        },
      },
    ],
  },
];
