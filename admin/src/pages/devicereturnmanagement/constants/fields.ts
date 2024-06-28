import { getAlldeviceassignment, getAllemployee } from '../service';

export const fields = (id, form) => [
  {
    valueType: 'group',
    columns: [
      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'deviceReturnID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Ngày trả',
        dataIndex: 'returnAt',
        valueType: 'date',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Nhân viên thực hiện trả',
        dataIndex: ['employeeReturnID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        request: async () => {
          const res = await getAllemployee();
          return res.data.map((item) => {
            return {
              label: `${item?.employeeID} - ${item?.employeename}`,
              value: item?.employeeID,
            };
          });
        },
      },
      {
        title: 'Mã phiếu cấp thiết bị',
        dataIndex: ['deviceAssignmentID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 8,
        },
        request: async () => {
          const res = await getAlldeviceassignment();
          return res.data.map((item) => {
            return { label: `${item?.deviceAssignmentID}`, value: item?.deviceAssignmentID };
          });
        },
      },
      {
        title: 'Trạng thái lúc trả',
        dataIndex: 'statusID',
        colProps: {
          xs: 24,
          md: 6,
        },
        valueType: 'select',
        valueEnum: {
          0: {
            text: 'Bình thường',
          },
          1: {
            text: 'Hỏng',
          },
          2: {
            text: 'Mất',
          },
          3: {
            text: 'Đã hết hạn sử dụng',
          },
        },
      },
      {
        title: 'Ghi chú',
        dataIndex: 'note',
        colProps: {
          xs: 24,
          md: 8,
        },
      },
    ],
  },
];
