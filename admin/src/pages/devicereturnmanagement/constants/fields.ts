import { getAlldeviceassignment, getAllemployee } from '../service';

export const fields = (id, form, CurrentUser) => [
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
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn ngày trả!',
            },
          ],
        },
      },
      {
        title: 'Nhân viên thực hiện trả',
        dataIndex: ['employeeReturnID'],
        valueType: 'select',
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
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn nhân viên thực hiện trả!',
            },
          ],
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
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn mã phiếu cấp thiết bị!',
            },
          ],
        },
      },
      {
        title: 'Trạng thái lúc trả',
        dataIndex: 'statusID',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn trạng thái lúc trả!',
            },
          ],
        },
        valueType: 'select',
        request: async () => {
          return [
            { label: 'Bình thường', value: 0 },
            { label: 'Hỏng', value: 1 },
            { label: 'Mất', value: 2 },
            { label: 'Đã hết hạn sử dụng', value: 3 },
          ];
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
