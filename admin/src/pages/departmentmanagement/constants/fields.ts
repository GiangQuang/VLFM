
import { getAllBranch } from "../service";

export const fields = (id, form) => [
  {

    valueType: 'group',
    columns: [

      {
        hideInForm: true,
        title: 'Mã dự phòng',
        dataIndex: 'deptID',
        colProps: {
          xs: 24,
          md: 6,
        },
      },
      {
        title: 'Mã cơ sở',
        dataIndex: ['branchID'],
        type: 'select',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng chọn cơ sở!',
            },
          ],
        },
        request: async () => {
          const res = await getAllBranch();
          return res.data.map((item) => ({
            label: `${item?.branchID} - ${item?.branchname}`,
            value: item?.branchID,
          }));
        },
      },
      {
        title: 'Tên bộ phận',
        dataIndex: 'deptname',
        colProps: {
          xs: 24,
          md: 6,
        },
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập tên bộ phận!',
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
