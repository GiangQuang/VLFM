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
      },
      {
        title: 'Mã nhân viên',
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
        title: 'Mã nhà cung cấp',
        type: 'select',
        dataIndex: ['providerID'],
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllprovider();
          return res.data.map((item) => {
            return {label:`${item?.providerID} - ${item?.providername} `, value: item?.providerID}
          });
        },
      },
      {
        title: 'Số hoá đơn',
        dataIndex: 'receiptcode',
        colProps: {
          xs: 24,
          md: 6,
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
